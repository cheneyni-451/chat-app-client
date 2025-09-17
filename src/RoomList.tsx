import "./styles/RoomList.css";
import type { Room } from "./models/roomModels";

type Props = {
  rooms: Room[];
  selectRoom: (room: Room) => void;
};

export default function RoomList({ rooms, selectRoom }: Props) {
  return (
    <ul className="room-list">
      {rooms.map((room) => (
        <li key={room.id}>
          <button onClick={() => selectRoom(room)}>{room.name}</button>
        </li>
      ))}
    </ul>
  );
}
