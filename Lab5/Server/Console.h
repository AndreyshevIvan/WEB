#pragma once
#include <iostream>
#include <fstream>
#include <string>

namespace
{
	const std::string P = "> ";
	const std::string ERR = "Server error: ";
}

class CConsole
{
public:
	static void LogTitle(const std::string &title)
	{
		std::cout << "---" << title << "---" << std::endl;
	}
	static void Log(const std::string &message, size_t level = 0)
	{
		std::cout << Plank(level) << message << std::endl;
	}
	static void ErrLog(const std::string &message)
	{
		std::cerr << ERR << message << std::endl;
	}
	static void ErrLog(const std::string &message, int code)
	{
		std::cerr << ERR << message << ": " << code << std::endl;
	}

private:

	static std::string Plank(size_t level)
	{
		if (level == 0 || level == 1)
		{
			return P;
		}

		std::string result;
		while (level != 1)
		{
			result += '-';
			level--;
		}

		return result + P;
	}
};