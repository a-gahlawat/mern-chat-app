import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, Tooltip, IconButton, Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const ScrollableChat = ({ messages, deleteMessage }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed style={{ overflowX: "hidden" }}>
      {messages &&
        messages.map((m, i) => (
          <Box display="flex" key={m._id} alignItems="center">
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <Box
              bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
              borderRadius="20px"
              padding="5px 15px"
              maxWidth="75%"
              ml={isSameSenderMargin(messages, m, i, user._id)}
              mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
              position="relative"
            >
              {m.content}
              {
                <IconButton
                  icon={<DeleteIcon />}
                  size="xs"
                  onClick={() => deleteMessage(m._id)}
                  aria-label="Delete message"
                  position="absolute"
                  top="-3px"
                  right="-5px"
                  variant="ghost"
                />
              }
            </Box>
          </Box>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
