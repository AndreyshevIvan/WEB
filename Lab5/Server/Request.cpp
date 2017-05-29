#include "Request.h"
#include "Utils.h"
#include "Exception.h"

using namespace std;
using namespace utils;
using namespace std::experimental::filesystem;

namespace
{
	const path ROOT = "files";

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
		{ TEXT, "text/plain; charset=utf-8" }
	};

	const map<string, FType> TYPE_EXTENSION = {
		{ ".html", HTML },
		{ ".js", JS },
		{ ".jpeg", JPEG },
		{ ".txt", TEXT }
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
	streamBuffer >> tmpTypeStr;
	streamBuffer >> tmpBodyStr;
	auto typeInMap = REQUEST_TYPES.find(to_lower(tmpTypeStr));

	if (typeInMap == REQUEST_TYPES.end())
	{
		return INVALID_REQUEST_TYPE;
	}
	else if (!IsBodyValid(tmpBodyStr))
	{
		return INVALID_REQUEST_BODY;
	}

	type = typeInMap->second;
	body = ROOT.string() + tmpBodyStr;

	return SUCCESS;
}

bool CRequest::IsBodyValid(const std::string &body)
{
	(void)body;
	return true;
}

void CRequest::DoGet(const std::string &url, std::stringstream &response)
{
	const string index = ROOT.string() + "/" + "index.html";

	if (url == ROOT.string() + "/")
	{
		auto rootJson = to_json(recursive_directory_iterator(ROOT));
		response << Response(OK, HTML, rootJson);
		return;
	}
	if (url == index)
	{
		response << GetResponseWithFile("index.html");
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
	ifstream file(filePath, ios::binary);
	auto extension = get_extension(filePath);
	auto isTypeValid = TYPE_EXTENSION.find(extension) != TYPE_EXTENSION.end();
	if (!file.is_open() || !isTypeValid)
	{
		return Response(NOT_FOUND, TEXT, CODES.at(NOT_FOUND));
	}

	auto type = TYPE_EXTENSION.at(extension);
	string fileStr;
	string tmp;

	while (getline(file, tmp))
	{
		tmp += "\r\n";
		fileStr += tmp;
	}
	file.close();

	return Response(OK, type, fileStr);
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