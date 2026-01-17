import { useEffect } from "react";
import { getSocket } from "@/services/socketClient";
import { useQueryClient } from "@tanstack/react-query";
import type { Message } from "@/components/ChatComponent";
import type { Conversation } from "./useConversation";
// import type { ChatUserProps } from "./useUsers";

export const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handler = (message: Message) => {
      const { senderId } = message;

      // Update Messages
      queryClient.setQueryData<Message[]>(["messages", senderId], (old) => {
        return old ? [...old, message] : [message];
      });

      // Update conversations
      queryClient.setQueryData<Conversation[]>(["conversations"], (old) => {
        if (!old) return old;

        const updated = old.map((conv) => {
          if (conv.chatUserId._id === senderId) {
            return {
              ...conv,
              lastMessage: message.text,
              visited: false,
              time: new Date().toISOString(),
            };
          }
          return conv;
        });

        // Move updated conversation to top
        const updatedConv = updated.find((c) => c.chatUserId._id === senderId);

        if (!updatedConv) {
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          return old;
        }

        const rest = updated.filter((c) => c.chatUserId._id !== senderId);

        return updatedConv ? [updatedConv, ...rest] : old;
      });
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [queryClient]);
};

export default useSocket;
