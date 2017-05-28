#pragma once
#include <algorithm>

namespace utils
{
	std::string to_lower(std::string str);

	std::string to_lower(std::string str)
	{
		std::transform(str.begin(), str.end(), str.begin(), ::tolower);
		return str;
	}
}