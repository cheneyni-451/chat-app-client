import { styled } from "@mui/material/styles";
import type { MessageDetail } from "./models/messageModels";
import { Grid } from "@mui/material";

const StyledMessage = styled(Grid)`
  color: #313244;
  border: none;
  background-color: #b4befe;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
`;

const UserStyledMessage = styled(StyledMessage)`
  background-color: #89b4fa;
  margin: 0;
`;

export default function ChatMessage({
  message,
  isUserMessage,
}: {
  message: MessageDetail;
  isUserMessage: boolean;
}) {
  return isUserMessage ? (
    <UserStyledMessage alignSelf="flex-end">
      {message.content}
    </UserStyledMessage>
  ) : (
    <StyledMessage alignSelf="flex-start">{message.content}</StyledMessage>
  );
}
