#pragma once
#include <exception>
#include <string>

class CException : std::invalid_argument
{
public:
	CException(const std::string &message, int code)
		: std::invalid_argument(message + std::to_string(code) + "\n")
	{
	}
};