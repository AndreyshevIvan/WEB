#include "Server.h"
#include "Console.h"

int main()
{
	try
	{
		CServer::Start();
	}
	catch (const std::exception &e)
	{
		CConsole::ErrLog(e.what());
	}

	return 0;
}
