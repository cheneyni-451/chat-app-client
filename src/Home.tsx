import "./styles/Home.css";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/useAuth";
import RoomList from "./RoomList";
import type { Room } from "./models/roomModels";
import { getRooms } from "./apis/roomApis";
import Chat from "./Chat";
import { socket } from "./main";
import { Grid } from "@mui/material";

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
    <Grid container sx={{ maxHeight: "100%", height: "100%" }}>
      <Grid size={2} justifyContent={"start"} sx={{ height: "100%" }}>
        <RoomList rooms={rooms} selectRoom={handleSelectRoom} />
      </Grid>
      <Grid size={10} sx={{ height: "100%" }}>
        {selectedRoom && <Chat room={selectedRoom} />}
      </Grid>
    </Grid>
  );
}
