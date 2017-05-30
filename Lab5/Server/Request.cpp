#include "Request.h"
#include "Utils.h"
#include "Exception.h"

using namespace std;
using namespace utils;
using namespace std::experimental::filesystem;

namespace
{
	const path FILES_DIR = "files";
	const path CLIENT_DIR = "build";
	const char DIR_SLASH = '/';

	const map<string, RequestType> REQUEST_TYPES = {
		{ "get", RequestType::_GET },
		{ "delete", RequestType::_DELETE }
	};	

	const map<RCode, string> CODES = {
		{ OK, "200 OK" },
		{ NOT_FOUND, "404 Not found"}
	};

	const map<FType, string> TYPES = {
		{ HTML, "text/html; charset=utf-8" },
		{ JS, "text/javascript; charset=utf-8" },
		{ JPEG, "image/jpeg" },
		{ TEXT, "text/plain; charset=utf-8" },
		{ CSS, "text/css; charset=utf-8" }
	};

	const map<string, FType> TYPE_EXTENSION = {
		{ ".html", HTML },
		{ ".js", JS },
		{ ".jpeg", JPEG },
		{ ".txt", TEXT },
		{ ".css", CSS }
	};
}

void CRequest::DoRequest(char buffer[], stringstream &response)
{
	RequestType type;
	string body;
	response.clear();

	int parseResult = Parse(buffer, type, body);
	if (parseResult != SUCCESS)
	{
		throw CException("Parse request error: ", parseResult);
	}

	switch (type)
	{
	case RequestType::_GET:
		DoGet(body, response);
		break;
	case RequestType::_DELETE:
		DoDelete(body, response);
		break;
	default:
		break;
	}
}

int CRequest::Parse(char buffer[], RequestType &type, string &body)
{
	stringstream streamBuffer(buffer);
	string tmpTypeStr;
	string tmpBodyStr;
	streamBuffer >> tmpTypeStr >> tmpBodyStr;
	auto typeInMap = REQUEST_TYPES.find(to_lower(tmpTypeStr));

	if (typeInMap == REQUEST_TYPES.end())
	{
		return INVALID_REQUEST_TYPE;
	}
	if (!IsBodyValid(tmpBodyStr))
	{
		return INVALID_REQUEST_BODY;
	}

	auto clientDirStr = DIR_SLASH + CLIENT_DIR.string();
	auto directory = tmpBodyStr.substr(0, clientDirStr.size());
	auto isBuildDir = directory == clientDirStr;

	body = (isBuildDir) ? tmpBodyStr : FILES_DIR.string() + tmpBodyStr;
	type = typeInMap->second;

	return SUCCESS;
}

bool CRequest::IsBodyValid(const std::string &body)
{
	(void)body;
	return true;
}

void CRequest::DoGet(const std::string &url, std::stringstream &response)
{
	if (url == FILES_DIR.string() + "/")
	{
		auto rootJson = to_json(recursive_directory_iterator(FILES_DIR));
		response << Response(OK, HTML, rootJson);
		return;
	}

	response << GetResponseWithFile(url);
}

void CRequest::DoDelete(const std::string &url, std::stringstream &response)
{
	if (!exists(url))
	{
		response << Response(NOT_FOUND, TEXT, CODES.at(NOT_FOUND));
		return;
	}

	if (!is_regular_file(url))
	{
		response << Response(NOT_FOUND, TEXT, url + " is not a file");
		return;
	}

	remove(url);
	response << Response(OK, TEXT, url + " was deleted");
}

std::string CRequest::GetResponseWithFile(std::string filePath)
{
	if (filePath[0] == DIR_SLASH)
	{
		filePath.erase(0, 1);
	}

	ifstream file(filePath, ios::binary);
	auto extension = get_extension(filePath);
	auto isTypeValid = TYPE_EXTENSION.find(extension) != TYPE_EXTENSION.end();
	if (!file.is_open() || !isTypeValid)
	{
		return Response(NOT_FOUND, TEXT, CODES.at(NOT_FOUND));
	}

	string fileStr;
	string tmp;

	while (getline(file, tmp))
	{
		tmp += "\r\n";
		fileStr += tmp;
	}
	file.close();

	return Response(OK, TYPE_EXTENSION.at(extension), fileStr);
}

std::string CRequest::Response(RCode code, FType type, const std::string &body)
{
	auto codeStr = CODES.at(code);
	auto typeStr = TYPES.at(type);

	std::string response = "HTTP/1.1 " + codeStr + "\r\n"
		+ "Version: HTTP/1.1\r\n"
		+ "Content-Type: " + typeStr + "\r\n"
		+ "Content-Length: " + to_string(body.length())
		+ "\r\n\r\n"
		+ body;

	return response;
}