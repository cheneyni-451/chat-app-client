import "./styles/Home.css";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/useAuth";
import RoomList from "./RoomList";
import type { Room } from "./models/roomModels";
import { getRooms } from "./apis/roomApis";
import Chat from "./Chat";
import { socket } from "./main";

export default function Home() {
  const auth = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    getRooms(auth.getToken()!).then(setRooms);
  }, []);

  function handleSelectRoom(room: Room) {
    if (selectedRoom) {
      socket.emit("leave room", selectedRoom.id);
    }
    setSelectedRoom(room);
    socket.emit("join room", room.id);
  }

  return (
    <div className="container">
      <div className="rooms">
        <RoomList rooms={rooms} selectRoom={handleSelectRoom} />
      </div>
      <div className="chat">{selectedRoom && <Chat room={selectedRoom} />}</div>
    </div>
  );
}
