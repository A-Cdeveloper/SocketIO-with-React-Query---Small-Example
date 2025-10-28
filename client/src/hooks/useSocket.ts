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

    // Named handler functions
    const handleCarDeleted = (data: { id: number }) => {
      invalidateCarsCache();
      invalidateCarCache(data.id);
    };

    const handleCarUpdated = (car: CarType) => {
      invalidateCarsCache();
      invalidateCarCache(car.id);
    };

    const handleCarAdded = () => {
      invalidateCarsCache();
    };

    // Register event listeners
    socket.on("car:deleted", handleCarDeleted);
    socket.on("car:updated", handleCarUpdated);
    socket.on("car:added", handleCarAdded);

    // Cleanup: remove ALL listeners before disconnect
    return () => {
      socket.off("car:deleted", handleCarDeleted);
      socket.off("car:updated", handleCarUpdated);
      socket.off("car:added", handleCarAdded);
      socket.disconnect();
    };
  }, [queryClient]);
};
