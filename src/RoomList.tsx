import "./styles/RoomList.css";
import type { Room } from "./models/roomModels";
import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  styled,
} from "@mui/material";

type Props = {
  rooms: Room[];
  selectRoom: (room: Room) => void;
  selectedRoom: Room | null;
  handleCreateRoom: () => void;
};

const RoomButton = styled(ListItemButton)(({ theme }) => ({
  border: "1px solid #cba6f7",
  borderRadius: "10px",
  margin: "4px 0",
  marginRight: "8px",

  "&.Mui-selected": {
    backgroundColor: "#cba6f7",
    color: "#1e1e2e",
  },
}));

export default function RoomList({
  rooms,
  selectRoom,
  selectedRoom,
  handleCreateRoom,
}: Props) {
  return (
    <Stack justifyContent="space-between" sx={{ height: "100%" }}>
      <List disablePadding sx={{ overflowY: "scroll", marginBottom: "20px" }}>
        {rooms.map((room) => (
          <RoomButton
            key={room.id}
            onClick={() => selectRoom(room)}
            selected={selectedRoom ? selectedRoom.id === room.id : false}
          >
            <ListItemText>{room.name}</ListItemText>
          </RoomButton>
        ))}
      </List>
      <Button
        variant="outlined"
        color="success"
        size="large"
        onClick={handleCreateRoom}
      >
        Create Room
      </Button>
    </Stack>
  );
}
