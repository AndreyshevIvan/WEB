#include <filesystem>

#include "Server.h"
#include "Exception.h"
#include "Console.h"
#include "Request.h"

namespace
{
	const char* IP_ADDRES = "127.0.0.1";
	const char* PORT = "80";
	const int BUFFER_MAX_SIZE = 1024;
}

using namespace std;
using namespace std::experimental::filesystem;

void CServer::Start()
{
	CConsole::LogTitle("Start server");
	CServer* server = nullptr;

	try
	{
		server = new (std::nothrow) CServer;
		CConsole::Log("Enter process loop");
		while (true)
		{
			int clientSocket = INVALID_SOCKET;
			server->WaitRequest(clientSocket);
			closesocket(clientSocket);
		}
	}
	catch (const exception &e)
	{
		server->Cleanup();
		delete server;
		throw e;
	}
	CConsole::Log("Server was stopped");
}

CServer::CServer()
{
	int result = WSAStartup(MAKEWORD(2, 2), &m_wsaData);
	if (result != 0)
	{
		throw new CException("WSAStartup failed: ", result);
	}

	InitAdress();
	InitListenSocket();
	InitClientSocket();

	CConsole::LogTitle("Connection complete");
}

void CServer::InitAdress()
{
	CConsole::Log("Initialize adress");
	m_addres = NULL;
	ZeroMemory(&m_hints, sizeof(m_hints));

	m_hints.ai_family = AF_INET;
	m_hints.ai_socktype = SOCK_STREAM;
	m_hints.ai_protocol = IPPROTO_TCP;
	m_hints.ai_flags = AI_PASSIVE;

	int code = getaddrinfo(IP_ADDRES, PORT, &m_hints, &m_addres);
	if (code != 0)
	{
		throw new CException("getaddrinfo failed: ", code);
	}
	CConsole::Log("The address was initialized successfully");
}

void CServer::InitListenSocket()
{
	CConsole::Log("Initialize listen socket");
	const auto family = m_addres->ai_family;
	const auto sockType = m_addres->ai_socktype;
	const auto protocol = m_addres->ai_protocol;

	CConsole::Log("Create socket", 2);
	m_listenSocket = socket(family, sockType, protocol);
	if (m_listenSocket == INVALID_SOCKET)
	{
		throw CException("Error at creating socket: ", WSAGetLastError());
	}

	CConsole::Log("Bind socket", 2);
	const auto addrLen = (int)m_addres->ai_addrlen;
	int code = bind(m_listenSocket, m_addres->ai_addr, addrLen);
	if (code == SOCKET_ERROR)
	{
		throw CException("Bind failed with error: ", WSAGetLastError());
	}

	CConsole::Log("Start listen socket", 2);
	if (listen(m_listenSocket, SOMAXCONN) == SOCKET_ERROR)
	{
		throw CException("Listen failed with error: ", WSAGetLastError());
	}
	CConsole::Log("The listen socket was initialized successfully");
}

void CServer::InitClientSocket()
{
	CConsole::Log("Initialize client socket");
	CConsole::Log("Waiting connection...", 2);
	m_clientSocket = accept(m_listenSocket, NULL, NULL);
	if (m_clientSocket == INVALID_SOCKET)
	{
		throw CException("Accept failed: ", WSAGetLastError());
	}
	CConsole::Log("The client socket was initialized successfully");
}

void CServer::WaitRequest(int &clientSocket)
{
	char buffer[BUFFER_MAX_SIZE];

	clientSocket = accept(m_listenSocket, NULL, NULL);
	if (clientSocket == INVALID_SOCKET)
	{
		throw CException("ClientSocket: accept failed : ", WSAGetLastError());
	}
	int recvResult = recv(clientSocket, buffer, BUFFER_MAX_SIZE, 0);
	if (recvResult < 0)
	{
		throw CException("ClientSocket: recv failed", recvResult);
	}
	else if (recvResult == 0)
	{
		CConsole::ErrLog("Connection closed...");
		return;
	}

	WorkWithRequest(buffer, clientSocket);
}

void CServer::WorkWithRequest(char buffer[], int clientSocket)
{
	stringstream response;
	CRequest::DoRequest(buffer, response);
	auto responseStr = response.str();
	auto respLen = responseStr.length();
	int recvResult = send(clientSocket, response.str().c_str(), respLen, 0);

	if (recvResult == SOCKET_ERROR)
	{
		CConsole::ErrLog("Send failed: ", WSAGetLastError());
	}
}

void CServer::Cleanup()
{
	freeaddrinfo(m_addres);
	closesocket(m_listenSocket);
	WSACleanup();
}