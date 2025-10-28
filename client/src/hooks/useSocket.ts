import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { env } from "@/lib/env";

export const useSocket = () => {
  const queryClient = useQueryClient();

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

    // Listen for car:deleted event
    socket.on("car:deleted", (data: { id: number }) => {
      console.log("📥 Socket event: car:deleted", data);

      // Remove all cars queries to force fresh fetch
      queryClient.removeQueries({ queryKey: ["cars"], exact: false });
      queryClient.removeQueries({ queryKey: ["car", data.id] });

      // Refetch to update UI if component is mounted
      queryClient.refetchQueries({ queryKey: ["cars"], type: "active" });
    });

    // TODO: Add car:added and car:updated listeners

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
};
