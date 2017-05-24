#include "Server.h"
#include "Exception.h"
#include <sstream>

namespace
{
	const char* IP_ADDRES = "127.0.0.1";
	const char* PORT = "80";
}

using namespace std;

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
		WSACleanup();
		throw new CException("getaddrinfo failed: ", code);
	}
}

void CServer::InitListenSocket()
{
	m_listenSocket = socket(m_addres->ai_family, m_addres->ai_socktype, m_addres->ai_protocol);
	if (m_listenSocket == INVALID_SOCKET)
	{
		freeaddrinfo(m_addres);
		WSACleanup();
		throw CException("Error at socket: ", WSAGetLastError());
	}

	int code = bind(m_listenSocket, m_addres->ai_addr, (int)m_addres->ai_addrlen);
	if (code == SOCKET_ERROR)
	{
		freeaddrinfo(m_addres);
		closesocket(m_listenSocket);
		WSACleanup();
		throw CException("Bind failed with error: ", WSAGetLastError());
	}

	if (listen(m_listenSocket, SOMAXCONN) == SOCKET_ERROR)
	{
		closesocket(m_listenSocket);
		WSACleanup();
		throw CException("Listen failed with error: ", WSAGetLastError());
	}
}

void CServer::InitClientSocket()
{
	m_clientSocket = accept(m_listenSocket, NULL, NULL);
	if (m_clientSocket == INVALID_SOCKET)
	{
		closesocket(m_listenSocket);
		WSACleanup();
		throw CException("Accept failed: ", WSAGetLastError());
	}
}

void CServer::Start()
{
	CServer server;
	while (true)
	{
		server.ProcessRequest();
	}
}

void CServer::ProcessRequest()
{
	char buffer[MAX_CLIENT_BUFFER_SIZE];
	int clientSocket = INVALID_SOCKET;

	clientSocket = accept(m_listenSocket, NULL, NULL);
	if (clientSocket == INVALID_SOCKET)
	{
		cerr << "accept failed: " << WSAGetLastError() << "\n";
		closesocket(m_listenSocket);
		WSACleanup();
	}

	int result = recv(clientSocket, buffer, MAX_CLIENT_BUFFER_SIZE, 0);

	std::stringstream response;
	std::stringstream responseBody;

	if (result == SOCKET_ERROR)
	{
		cerr << "recv failed: " << result << "\n";
		closesocket(clientSocket);
	}
	else if (result == 0)
	{
		cerr << "connection closed...\n";
	}
	else if (result > 0)
	{
		buffer[result] = '\0';
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

		result = send(clientSocket, response.str().c_str(), response.str().length(), 0);

		if (result == SOCKET_ERROR)
		{
			cerr << "send failed: " << WSAGetLastError() << "\n";
		}
		closesocket(clientSocket);
	}
}