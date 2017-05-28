#pragma once
#include <algorithm>
#include <filesystem>

using namespace std::experimental::filesystem;

namespace utils
{

	std::string to_lower(std::string str);
	std::string to_json(const recursive_directory_iterator &directory);
	std::string get_extension(const std::string &filePath);

	std::string to_lower(std::string str)
	{
		std::transform(str.begin(), str.end(), str.begin(), ::tolower);
		return str;
	}
	std::string to_json(const recursive_directory_iterator &directory)
	{
		std::stringstream jStream;
		jStream << '[';
		
		for (auto it : directory)
		{
			jStream << "{\"name\":\"" << it.path().generic_string()
				<< "\", \"isDir\":\"" << is_directory(it.path()) << "\"}, ";
		}

		std::string jString = jStream.str();
		if (jString.size() > 1)
		{
			jString.erase(jString.size() - 2, 2);
		}

		return jString + "]";
	}
	std::string get_extension(const std::string &filePath)
	{
		path fPath = filePath;
		return fPath.extension().generic_string();
	}
}