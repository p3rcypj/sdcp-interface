import socket

message = "M99999".encode('utf-8')
server_address = ('10.6.0.4', 3000)
local_port = 50000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

sock.bind(("", local_port))

sock.settimeout(5)

try:
    print(f"Sending message: {message} to {server_address}")
    sock.sendto(message, server_address) # UDP request

    data, addr = sock.recvfrom(512)  # 512 bytes buffer
    print(f"Response from {addr}: {data.decode('utf-8')}")

except socket.timeout:
    print("Timeout")

finally:
    sock.close()
    print("Socket closed")