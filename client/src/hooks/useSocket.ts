import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { env } from "@/lib/env";
import type { CarType } from "@shared/types";

export const useSocket = () => {
  useEffect(() => {
    const socket: Socket = io(env.VITE_SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    // Listen for car events
    socket.on("car:added", (car: CarType) => {
      console.log("📥 Socket event: car:added", car);
    });

    socket.on("car:updated", (car: CarType) => {
      console.log("📥 Socket event: car:updated", car);
    });

    socket.on("car:deleted", (data: { id: number }) => {
      console.log("📥 Socket event: car:deleted", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
