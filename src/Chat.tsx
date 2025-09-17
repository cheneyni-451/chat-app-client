import "./styles/Chat.css";
import { useEffect, useState } from "react";
import type { Room } from "./models/roomModels";
import type { MessageDetail } from "./models/messageModels";
import { getMessagesForRoom } from "./apis/roomApis";
import { useAuth } from "./auth/useAuth";

export default function Chat({ room }: { room: Room }) {
  const auth = useAuth();
  const [messages, setMessages] = useState<MessageDetail[]>([]);

  useEffect(() => {
    getMessagesForRoom(auth.getToken()!, room.id)
      .then(setMessages)
      .catch(console.error);
  }, [room]);

  return (
    <ul className="message-list">
      {messages.map((msg) => {
        const isUserMessage = msg.user.id === auth.user?.id;
        return (
          <li
            className={"message " + (isUserMessage ? "user-message" : "")}
            key={msg.id}
          >
            {msg.content}
          </li>
        );
      })}
    </ul>
  );
}
