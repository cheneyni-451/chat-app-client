import "./styles/RoomList.css";
import type { Room } from "./models/roomModels";
import { Button, Grid, Stack } from "@mui/material";

type Props = {
  rooms: Room[];
  selectRoom: (room: Room) => void;
};

export default function RoomList({ rooms, selectRoom }: Props) {
  return (
    <ul
      style={{
        listStyleType: "none",
        padding: "0",
      }}
    >
      <Stack spacing={1}>
        {rooms.map((room) => (
          <li key={room.id}>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ width: "100%" }}
              onClick={() => selectRoom(room)}
            >
              {room.name}
            </Button>
          </li>
        ))}
      </Stack>
    </ul>
  );
}
