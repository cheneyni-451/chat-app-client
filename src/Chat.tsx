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
import { Button, Stack, TextField } from "@mui/material";
import MessageList from "./MessageList";

export default function Chat({ room }: { room: Room }) {
  const auth = useAuth();
  const [messages, setMessages] = useState<MessageDetail[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  socket.on(
    "chat message",
    (message: MessageDetail, ack: (response: boolean) => void) => {
      setMessages([...messages, message]);
      if (ack) {
        ack(true);
      }
    }
  );

  useEffect(() => {
    getMessagesForRoom(auth.getToken()!, room.id)
      .then(setMessages)
      .catch(console.error);
  }, [room]);

  function handleSendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!messageInput) {
      return;
    }
    const messagePayload: MessageInput = {
      roomId: room.id,
      userId: auth.user!.id,
      content: messageInput,
    };
    createMessage(auth.getToken()!, messagePayload)
      .then((data) => {
        if (data) {
          setMessages([...messages, data]);
          setMessageInput("");
        }
      })
      .catch(console.error);
  }

  return (
    <Stack spacing={1} sx={{ height: "100%" }}>
      <MessageList messages={messages} />
      <form className="message-form" onSubmit={(e) => handleSendMessage(e)}>
        <TextField
          multiline
          variant="outlined"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Stack>
  );
}
