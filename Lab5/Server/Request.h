#pragma once
#include <string>
#include <sstream>
#include <map>
#include <fstream>

enum class RequestType
{
	_GET,
	_DELETE,
};

enum FileType
{
	TEXT,
	HTML,
	JS,
	JPEG,
};

enum CodeType
{
	OK,
	NOT_FOUND,
};

enum ParseCode
{
	SUCCESS = 0,
	INVALID_REQUEST_TYPE,
	INVALID_REQUEST_BODY,
};

typedef const std::string& Code;
typedef const std::string& Type;

class CRequest
{
public:
	static void DoRequest(char buffer[], std::stringstream &response);

private:
	static void DoGet(const std::string &url, std::stringstream &response);
	static void DoDelete(const std::string &url, std::stringstream &response);

	static std::string GetResponseWithFile(std::string filePath);
	static std::string Response(Code code, Type type, const std::string &body);

	static int Parse(char buffer[], RequestType &type, std::string &body);
	static bool IsBodyValid(const std::string &body);
};