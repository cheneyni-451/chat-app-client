import { useEffect, useState, type FormEvent } from "react";
import type { Room } from "./models/roomModels";
import type { MessageDetail } from "./models/messageModels";
import {
  createMessage,
  getMessagesForRoom,
  type MessageInput,
} from "./apis/roomApis";
import { socket } from "./main";
import { Button, Stack, TextField } from "@mui/material";
import MessageList from "./MessageList";
import { useAuth } from "./hooks/useAuth";

export default function Chat({ room }: { room: Room }) {
  const auth = useAuth();
  const [messages, setMessages] = useState<MessageDetail[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  socket.on(
    "chat message",
    (message: MessageDetail, ack: (response: boolean) => void) => {
      if (
        messages.length > 0 &&
        messages[messages.length - 1].id !== message.id
      ) {
        setMessages([...messages, message]);
      }
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
        <Stack direction="row" spacing={1} justifyContent="center">
          <TextField
            multiline
            variant="outlined"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            sx={{
              width: "50%",
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
