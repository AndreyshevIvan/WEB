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

	const map<CodeType, string> CODES = {
		{ OK, "200 OK" },
		{ NOT_FOUND, "404 Not found"}
	};

	const map<FileType, string> TYPES = {
		{ HTML, "text/html; charset=utf-8" },
		{ JS, "text/javascript; charset=utf-8" },
		{ JPEG, "image/jpeg" },
		{ TEXT, "text/plain; charset=utf-8" }
	};

	const map<string, FileType> TYPE_EXTENSION = {
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
	body = tmpBodyStr;

	return SUCCESS;
}

bool CRequest::IsBodyValid(const std::string &body)
{
	(void)body;
	return true;
}

void CRequest::DoGet(const std::string &url, std::stringstream &response)
{
	if (url == "/" || url == "")
	{
		auto rootJson = to_json(recursive_directory_iterator(ROOT));
		response << Response(CODES.at(OK), TYPES.at(HTML), rootJson);
		return;
	}

	response << GetResponseWithFile(ROOT.string() + url);
}

void CRequest::DoDelete(const std::string &url, std::stringstream &response)
{
	response << "HTTP/1.1 200 OK\r\n"
		<< "Version: HTTP/1.1\r\n"
		<< "Content-Type: text/html; charset=utf-8\r\n"
		<< "\r\n\r\n"
		<< "GET";
}

std::string CRequest::GetResponseWithFile(std::string filePath)
{
	ifstream file(filePath, ios::binary);
	if (!file.is_open())
	{
		return Response(CODES.at(NOT_FOUND), TYPES.at(TEXT), CODES.at(NOT_FOUND));
	}

	auto extension = get_extension(filePath);
	auto type = TYPE_EXTENSION.at(extension);

	string fileStr;
	string tmp;
	while (getline(file, tmp))
	{
		tmp += "\n";
		fileStr += tmp;
	}
	file.close();
	return Response(CODES.at(OK), TYPES.at(TEXT), fileStr);
}

std::string CRequest::Response(Code code, Type type, const std::string &body)
{
	std::string response = "HTTP/1.1 " + code + "\r\n"
		+ "Version: HTTP/1.1\r\n"
		+ "Content-Type: " + type + "\r\n"
		+ "Content-Length: " + to_string(body.length())
		+ "\r\n\r\n"
		+ body;

	return response;
}