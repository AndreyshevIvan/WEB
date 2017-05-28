#include "Server.h"
#include "Exception.h"
#include "Console.h"
#include <sstream>

namespace
{
	const char* IP_ADDRES = "127.0.0.1";
	const char* PORT = "80";
	const int BUFFER_MAX_SIZE = 1024;
}

using namespace std;

CServer::CServer()
{
	int result = WSAStartup(MAKEWORD(2, 2), &m_wsaData);
	if (result != 0)
	{
		throw new CException("WSAStartup failed: ", result);
	}

	try
	{
		CConsole::Log("Initialize adress");
		InitAdress();
		CConsole::Log("The address was initialized successfully");
		CConsole::Log("Initialize listen socket");
		InitListenSocket();
		CConsole::Log("The listen socket was initialized successfully");
		CConsole::Log("Initialize client socket");
		InitClientSocket();
		CConsole::Log("The client socket was initialized successfully");
	}
	catch (const std::exception &e)
	{
		Cleanup();
		throw e;
	}
	CConsole::Log("---Connection complete---");
}

void CServer::InitAdress()
{
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
}

void CServer::InitListenSocket()
{
	const auto family = m_addres->ai_family;
	const auto sockType = m_addres->ai_socktype;
	const auto protocol = m_addres->ai_protocol;
	const auto addrLen = (int)m_addres->ai_addrlen;

	CConsole::Log("Create socket", 2);
	m_listenSocket = socket(family, sockType, protocol);
	if (m_listenSocket == INVALID_SOCKET)
	{
		throw CException("Error at creating socket: ", WSAGetLastError());
	}

	CConsole::Log("Bind socket", 2);
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
}

void CServer::InitClientSocket()
{
	CConsole::Log("Waiting connection...", 2);
	m_clientSocket = accept(m_listenSocket, NULL, NULL);
	if (m_clientSocket == INVALID_SOCKET)
	{
		throw CException("Accept failed: ", WSAGetLastError());
	}
}

void CServer::Start()
{
	CConsole::Log("Start server");
	CServer server;

	try
	{
		CConsole::Log("Enter process loop");
		while (true)
		{
			int clientSocket = INVALID_SOCKET;
			server.ProcessRequest(clientSocket);
			closesocket(clientSocket);
		}
	}
	catch (const std::exception &e)
	{
		server.Cleanup();
		throw e;
	}
	CConsole::Log("Server was stopped");
}

void CServer::ProcessRequest(int &clientSocket)
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
		cerr << "connection closed...\n";
		return;
	}

	WorkWithRequest(buffer, clientSocket, recvResult);
}

void CServer::WorkWithRequest(char buffer[], int clientSocket, int recvResult)
{
	std::stringstream response;
	std::stringstream responseBody;

	buffer[recvResult] = '\0';
	responseBody << "<title>Test C++ HTTP Server</title>\n"
		<< "<h1>Test page</h1>\n"
		<< "<p>This is body of the test page...</p>\n"
		<< "<h2>Request headers</h2>\n"
		<< "<pre>" << buffer << "</pre>\n"
		<< "<em><small>Test C++ Http Server</small></em>\n";

	response << "HTTP/1.1 200 OK\r\n"
		<< "Version: HTTP/1.1\r\n"
		<< "Content-Type: text/html; charset=utf-8\r\n"
		<< "Content-Length: " << responseBody.str().length()
		<< "\r\n\r\n"
		<< responseBody.str();

	auto flags = 0;
	auto respLen = response.str().length();
	recvResult = send(clientSocket, response.str().c_str(), respLen, flags);

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