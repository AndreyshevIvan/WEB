#pragma comment(lib, "ws2_32.lib")
#include <winsock2.h>
#include <ws2tcpip.h>
#include <stdio.h>
#include <string>
#include <iostream>
#include <sstream>

namespace
{
	const int MAX_CLIENT_BUFFER_SIZE = 1024;
}

class CServer
{
public:
	static void Start();
	void ProcessRequest();

private:
	CServer();

	void InitAdress();
	void InitListenSocket();
	void InitClientSocket();

	std::stringstream GetResponse(const std::stringstream &body);

	WSAData m_wsaData;
	int m_listenSocket;
	int m_clientSocket;
	struct addrinfo* m_addres;
	struct addrinfo m_hints;

	std::string m_exitMessage;
	int m_exitCode = 0;
};