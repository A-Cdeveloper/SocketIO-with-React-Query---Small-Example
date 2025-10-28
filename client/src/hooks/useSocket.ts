import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { env } from "@/lib/env";
import type { CarType } from "@shared/types";

export const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket: Socket = io(env.VITE_SOCKET_URL);

    const invalidateCarsCache = () => {
      queryClient.invalidateQueries({ queryKey: ["cars"], exact: false });
    };

    const invalidateCarCache = (carId: number) => {
      queryClient.invalidateQueries({ queryKey: ["car", carId] });
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
