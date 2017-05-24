#include "Server.h"

int main()
{
	try
	{
		CServer::Start();
	}
	catch (const std::exception &e)
	{
		std::cerr << e.what();
	}

	system("pause");
	return 0;
}
