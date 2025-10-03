import "./styles/Chat.css";
import { useEffect, useState, type FormEvent } from "react";
import type { Room } from "./models/roomModels";
import type { MessageDetail } from "./models/messageModels";
import {
  createMessage,
  getMessagesForRoom,
  type MessageInput,
} from "./apis/roomApis";
import { useAuth } from "./auth/useAuth";
import { socket } from "./main";

export default function Chat({ room }: { room: Room }) {
  const auth = useAuth();
  const [messages, setMessages] = useState<MessageDetail[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  useEffect(() => {
    getMessagesForRoom(auth.getToken()!, room.id)
      .then(setMessages)
      .catch(console.error);
  }, [room]);

  useEffect(() => {
    socket.on(
      "chat message",
      (message: MessageDetail, ack: (response: boolean) => void) => {
        setMessages([...messages, message]);
        if (ack) {
          ack(true);
        }
      }
    );
  }, []);

  function handleSendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const messagePayload: MessageInput = {
      roomId: room.id,
      userId: auth.user!.id,
      content: messageInput,
    };
    createMessage(auth.getToken()!, messagePayload)
      .then((data) => {
        if (data) {
          setMessages([...messages, data]);
        }
      })
      .catch(console.error);
  }

  return (
    <div className="container">
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
      <form className="message-form" onSubmit={(e) => handleSendMessage(e)}>
        <input
          type="text"
          name="message-content"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
