import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import RoomList from "./RoomList";
import type { Room } from "./models/roomModels";
import { createRoom, getRooms } from "./apis/roomApis";
import Chat from "./Chat";
import { socket } from "./main";
import { Grid } from "@mui/material";

export default function Home() {
  const auth = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const sortedRooms = useMemo(
    () => rooms.sort((a, b) => a.name.localeCompare(b.name)),
    [rooms]
  );

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

  function handleCreateRoom() {
    const roomName = `Room ${~~(Math.random() * 1000)}`;

    createRoom(auth.getToken()!, roomName, auth.user!.id)
      .then((roomId) => {
        if (!roomId) {
          throw new Error("failed to create room");
        }
        const newRoom: Room = {
          id: roomId,
          ownerId: auth.user!.id,
          name: roomName,
        };
        setRooms([...rooms, newRoom]);
      })
      .catch(console.error);
  }

  return (
    <Grid container sx={{ maxHeight: "100%", height: "100%" }} spacing={2}>
      <Grid size={2} justifyContent={"start"} sx={{ height: "100%" }}>
        <RoomList
          rooms={sortedRooms}
          selectRoom={handleSelectRoom}
          selectedRoom={selectedRoom}
          handleCreateRoom={handleCreateRoom}
        />
      </Grid>
      <Grid size={10} sx={{ height: "100%" }}>
        {selectedRoom && <Chat room={selectedRoom} key={selectedRoom.id} />}
      </Grid>
    </Grid>
  );
}
