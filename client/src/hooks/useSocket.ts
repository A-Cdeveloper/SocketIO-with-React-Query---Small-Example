import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { env } from "@/lib/env";
import type { CarType } from "@shared/types";

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

    const invalidateCarsCache = () => {
      queryClient.removeQueries({ queryKey: ["cars"], exact: false });
      queryClient.refetchQueries({ queryKey: ["cars"], type: "active" });
    };

    const invalidateCarCache = (carId: number) => {
      queryClient.removeQueries({ queryKey: ["car", carId] });
      queryClient.refetchQueries({ queryKey: ["car", carId], type: "active" });
    };

    socket.on("car:deleted", (data: { id: number }) => {
      invalidateCarsCache();
      invalidateCarCache(data.id);
    });

    socket.on("car:updated", (car: CarType) => {
      invalidateCarsCache();
      invalidateCarCache(car.id);
    });

    socket.on("car:added", () => {
      invalidateCarsCache();
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
};
