import { useEffect, useRef } from "react";
import type { MessageDetail } from "./models/messageModels";
import { Grid } from "@mui/material";
import { useAuth } from "./auth/useAuth";
import ChatMessage from "./ChatMessage";

export default function MessageList({
  messages,
}: {
  messages: MessageDetail[];
}) {
  const auth = useAuth();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      sx={{ overflowY: "scroll", height: "100%", paddingX: "0.5rem" }}
    >
      {messages.map((msg) => {
        const isUserMessage = msg.user.id === auth.user?.id;
        return (
          <ChatMessage
            message={msg}
            isUserMessage={isUserMessage}
            key={msg.id}
          />
        );
      })}
      <div ref={bottomRef} />
    </Grid>
  );
}
