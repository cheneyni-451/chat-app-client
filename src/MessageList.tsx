import { useEffect, useMemo, useRef } from "react";
import type { MessageDetail } from "./models/messageModels";
import { Stack, Typography } from "@mui/material";
import { useAuth } from "./hooks/useAuth";
import ChatMessage from "./ChatMessage";

/**
 * Messages grouped by user
 */
function GroupedMessages({ messages }: { messages: MessageDetail[] }) {
  if (messages.length === 0) {
    return <></>;
  }

  const auth = useAuth();
  const username = messages[0].user.name;
  const isUserMessage = auth.user!.id === messages[0].user.id;

  return (
    <>
      <Typography
        variant="caption"
        sx={{ lineHeight: 1, marginTop: "10px", marginLeft: "4px" }}
      >
        {username}
      </Typography>
      {messages.map((msg) => (
        <ChatMessage message={msg} isUserMessage={isUserMessage} key={msg.id} />
      ))}
    </>
  );
}

export default function MessageList({
  messages,
}: {
  messages: MessageDetail[];
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const groupedMessages = useMemo(() => {
    const groups: MessageDetail[][] = [];
    groups.push(
      messages.reduce((prev: MessageDetail[], cur: MessageDetail) => {
        if (prev.length === 0) {
          return [cur];
        } else {
          if (prev[0].user.id === cur.user.id) {
            return [...prev, cur];
          } else {
            groups.push(prev);
            return [cur];
          }
        }
      }, [])
    );

    return groups;
  }, [messages]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <Stack
      alignSelf="center"
      alignItems="flex-start"
      sx={{
        overflowY: "scroll",
        height: "100%",
        width: "90%",
        paddingRight: "0.5rem",
      }}
    >
      {groupedMessages.map((messages) => (
        <GroupedMessages messages={messages} />
      ))}
      <div ref={bottomRef} />
    </Stack>
  );
}
