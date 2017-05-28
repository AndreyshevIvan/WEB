#pragma once
#include <string>
#include <sstream>

enum class RequestType
{
	_GET,
	_DELETE,
};

class CRequest
{
public:
	static bool DoRequest(char buffer[], std::stringstream &response);

private:
	static bool Parse(char buffer[], RequestType &type, std::string &body);
	static bool IsBodyValid(const std::string &body);

};