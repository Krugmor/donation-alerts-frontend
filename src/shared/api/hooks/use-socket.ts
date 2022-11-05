import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (
  token: string | null,
  handlers: {
    [event: string]: (socket: Socket, msg: any) => void;
  }
) => {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (token) {
      socketRef.current = io(process.env.REACT_APP_API_URL || "", {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      for (let [event, handler] of Object.entries(handlers)) {
        socketRef.current.on(event, (msg) => handler(socketRef.current!, msg));
      }
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [token]);

  return { socket: socketRef.current };
};
