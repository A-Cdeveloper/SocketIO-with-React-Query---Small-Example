import type { CarType } from "./car";

// Socket.IO Event Types
export type SocketEvents = {
  // Server to Client events
  "car:added": (car: CarType) => void;
  "car:updated": (car: CarType) => void;
  "car:deleted": (data: { id: number }) => void;

  // Client to Server events
  "car:add": (car: CarType) => void;
  "car:update": (car: CarType) => void;
  "car:delete": (id: number) => void;
};
