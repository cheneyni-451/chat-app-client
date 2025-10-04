import "./styles/Chat.css";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Room } from "./models/roomModels";
import type { MessageDetail } from "./models/messageModels";
import {
  createMessage,
  getMessagesForRoom,
  type MessageInput,
} from "./apis/roomApis";
import { useAuth } from "./auth/useAuth";
import { socket } from "./main";
import { Grid, Stack, TextField } from "@mui/material";

export default function Chat({ room }: { room: Room }) {
  const auth = useAuth();
  const [messages, setMessages] = useState<MessageDetail[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const bottomRef = useRef(null);

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

  useEffect(() => {
    getMessagesForRoom(auth.getToken()!, room.id)
      .then(setMessages)
      .catch(console.error);
  }, [room]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

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
          setMessageInput("");
        }
      })
      .catch(console.error);
  }

  return (
    <Stack spacing={1} sx={{ height: "100%" }}>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        sx={{ overflowY: "scroll", height: "100%" }}
      >
        {messages.map((msg) => {
          const isUserMessage = msg.user.id === auth.user?.id;
          return (
            <Grid
              alignSelf={isUserMessage ? "flex-end" : "flex-start"}
              className={"message"}
              sx={{
                color: "#313244",
                border: "none",
                backgroundColor: isUserMessage ? "#89b4fa" : "#b4befe",
                marginY: isUserMessage ? "0" : "0.2rem",
              }}
              key={msg.id}
            >
              {msg.content}
            </Grid>
          );
        })}
        <div ref={bottomRef} />
      </Grid>
      <form className="message-form" onSubmit={(e) => handleSendMessage(e)}>
        <TextField
          multiline
          variant="outlined"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </Stack>
  );
}
