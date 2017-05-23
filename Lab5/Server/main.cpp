#pragma comment(lib, "ws2_32.lib")
#include <winsock2.h>
#include <ws2tcpip.h>
#include <stdio.h>
#include <string>
#include <iostream>

namespace
{
	const char* IP_ADDRES = "127.0.0.1";
	const int PORT = 1111;
}

int main()
{
	WSAData wsaData;
	WORD DllVersion = MAKEWORD(2, 1);
	if (WSAStartup(DllVersion, &wsaData) != 0)
	{
		MessageBoxA(NULL, "Winsock sturtup failed", "Error", MB_OK | MB_ICONERROR);
		return 1;
	}

	SOCKADDR_IN addr;
	int addrLen = sizeof(addr);
	std::uint32_t ip_address;
	inet_pton(AF_INET, IP_ADDRES, &ip_address);
	addr.sin_addr.s_addr = ip_address;
	addr.sin_port = htons(PORT);
	addr.sin_family = AF_INET;

	SOCKET sListen = socket(AF_INET, SOCK_STREAM, NULL);
	bind(sListen, (SOCKADDR*)&addr, sizeof(addr));
	listen(sListen, SOMAXCONN);

	SOCKET newConnection;
	newConnection = accept(sListen, (SOCKADDR*)&addr, &addrLen);
	if (newConnection == 0)
	{
		std::cerr << "Failed to accept the client's connection." << std::endl;
	}
	else
	{
		std::cout << "Client connected" << std::endl;
	}

	return 0;
}
