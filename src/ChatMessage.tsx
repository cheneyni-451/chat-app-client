import type { MessageDetail } from "./models/messageModels";
import { styled, Typography } from "@mui/material";

const StyledMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  lineHeight: "1rem",

  padding: "8px",
  border: 0,
  borderRadius: "10px",
  marginTop: "0.1rem",
  marginBottom: "0.1rem",
}));

const UserStyledMessage = styled(StyledMessage)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export default function ChatMessage({
  message,
  isUserMessage,
}: {
  message: MessageDetail;
  isUserMessage: boolean;
}) {
  return isUserMessage ? (
    <UserStyledMessage>{message.content}</UserStyledMessage>
  ) : (
    <StyledMessage>{message.content}</StyledMessage>
  );
}
