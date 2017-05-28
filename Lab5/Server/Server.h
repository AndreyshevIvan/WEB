#pragma comment(lib, "ws2_32.lib")
#include <winsock2.h>
#include <ws2tcpip.h>
#include <stdio.h>
#include <string>
#include <iostream>
#include <sstream>

class CServer
{
public:
	static void Start();

private:
	CServer();

	void WaitRequest(int &clientSocket);
	void WorkWithRequest(char buffer[], int clientSocket);

	void InitAdress();
	void InitListenSocket();
	void InitClientSocket();

	void Cleanup();

	WSAData m_wsaData;
	int m_listenSocket;
	int m_clientSocket;
	struct addrinfo* m_addres;
	struct addrinfo m_hints;

	std::string m_exitMessage;
	int m_exitCode = 0;
};