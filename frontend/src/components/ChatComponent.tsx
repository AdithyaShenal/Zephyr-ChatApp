import ChatBar from "./ChatBar";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/apiClient";
import type { AxiosError } from "axios";
import type { ApiError } from "@/hooks/useSignUp";
import { useEffect, useRef } from "react";
// import useSocket from "@/hooks/useSocket";
import WhatsappBg from "../assets/whatsapp.png";
import type { FriendProps } from "@/hooks/useGetFriends";

interface Props {
  userProps: FriendProps;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image?: string;
  createdAt: string;
}

const ChatComponent = ({ userProps }: Props) => {
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // useSocket();

  const { data: messages = [] } = useQuery<Message[], AxiosError<ApiError>>({
    queryKey: ["messages", userProps._id],
    queryFn: async () => {
      const res = await api.get(`/message/${userProps._id}`);
      return res.data.result;
    },
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (text: string) => {
      await api.post(`/message/send/${userProps._id}`, { text });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", userProps._id],
      });
    },
  });

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="shrink-0 border-b">
        <ChatHeader
          name={userProps.fullName}
          profilePic={userProps.profilePic}
        />
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto min-h-0 px-10 py-5 
        bg-white/90 dark:bg-black/70 
          bg-blend-lighten dark:bg-blend-darken"
        style={{ backgroundImage: `url(${WhatsappBg})` }}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            isMe={message.senderId !== userProps._id}
            text={message.text}
            time={new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Chat Bar */}
      <div className="shrink-0">
        <ChatBar onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatComponent;
