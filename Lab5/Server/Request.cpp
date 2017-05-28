#include <map>

#include "Request.h"
#include "Utils.h"
#include "Exception.h"

namespace
{
	const std::string GET = "get";
	const std::string DEL = "delete";
	const std::map<std::string, RequestType> REQUEST_TYPES = {
		{ GET, RequestType::_GET },
		{ DEL, RequestType::_DELETE }
	};
}

using namespace std;
using namespace utils;

bool CRequest::DoRequest(char buffer[], stringstream &response)
{
	RequestType type;
	string body;

	if (!Parse(buffer, type, body))
	{
		return false;
	}

	switch (type)
	{
	case RequestType::_GET:
		break;
	case RequestType::_DELETE:
		break;
	default:
		break;
	}

	response << "HTTP/1.1 200 OK\r\n"
		<< "Version: HTTP/1.1\r\n"
		<< "Content-Type: text/html; charset=utf-8\r\n"
		<< "\r\n\r\n"
		<< "GET";

	return true;
}

bool CRequest::Parse(char buffer[], RequestType &type, string &body)
{
	stringstream streamBuffer(buffer);
	string tmpTypeStr;
	streamBuffer >> tmpTypeStr;
	auto typeInMap = REQUEST_TYPES.find(tmpTypeStr);

	if (typeInMap == REQUEST_TYPES.end() || !IsBodyValid(tmpTypeStr))
	{
		return false;
	}

	type = typeInMap->second;
	body = tmpTypeStr;

	return true;
}

bool CRequest::IsBodyValid(const std::string &body)
{
	(void)body;
	return true;
}

