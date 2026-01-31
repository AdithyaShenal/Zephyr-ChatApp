import type { Socket } from "socket.io-client";
import { queryClient } from "@/main"; // We'll export this from main.tsx
import type { Message } from "@/components/ChatComponent";
import type { Conversation } from "@/hooks/useConversation";
import type { IncomingRequestProps } from "@/hooks/useIncomingRequests";
import toast from "react-hot-toast";
import {
  Mail,
  UserRoundPlus,
  UserRoundCheck,
  UserRoundMinus,
} from "lucide-react";
import React from "react";

let listenersSetup = false;

export const setupSocketListeners = (socket: Socket) => {
  if (listenersSetup) {
    console.log("Listeners already set up, skipping...");
    return;
  }

  console.log("Setting up socket listeners...");

  socket.onAny((eventName, ...args) => {
    console.log(`📨 [${eventName}]`, args);
  });

  // New Message Handler
  socket.on("newMessage", (message: Message) => {
    toast.success(`New message`, {
      duration: 3000,
      icon: React.createElement(Mail, { className: "w-5 h-5" }),
    });

    const { senderId } = message;

    // Update messages
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

      const updatedConv = updated.find((c) => c.chatUserId._id === senderId);
      if (!updatedConv) {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        return old;
      }

      const rest = updated.filter((c) => c.chatUserId._id !== senderId);
      return [updatedConv, ...rest];
    });
  });

  // New Friend Request Handler
  socket.on("newFriendRequest", (newFriendRequest: IncomingRequestProps) => {
    toast.success(
      `${newFriendRequest.requester.fullName} sent a friend request`,
      {
        duration: 3000,
        icon: React.createElement(UserRoundPlus, { className: "w-5 h-5" }),
      },
    );

    queryClient.setQueryData<IncomingRequestProps[]>(
      ["incoming", "requests"],
      (old) => {
        return old ? [...old, newFriendRequest] : [newFriendRequest];
      },
    );
  });

  // Friend Request Accepted
  socket.on("friendRequestAccepted", (fullName: string) => {
    toast.success(`${fullName} accepted your request`, {
      duration: 3000,
      icon: React.createElement(UserRoundCheck, { className: "w-5 h-5" }),
    });

    queryClient.invalidateQueries({ queryKey: ["sent", "requests"] });
    queryClient.invalidateQueries({ queryKey: ["incoming", "requests"] });
    queryClient.invalidateQueries({ queryKey: ["friends"] });
  });

  // Friend Request Rejected
  socket.on("friendRequestRejected", (fullName: string) => {
    toast.success(`${fullName} rejected your request`, {
      duration: 3000,
      icon: React.createElement(UserRoundMinus, { className: "w-5 h-5" }),
    });

    queryClient.invalidateQueries({ queryKey: ["people"] });
    queryClient.invalidateQueries({ queryKey: ["sent", "requests"] });
    queryClient.invalidateQueries({ queryKey: ["incoming", "requests"] });
    queryClient.invalidateQueries({ queryKey: ["friends"] });
  });

  // Request Cancelled
  socket.on("cancelSentRequest", () => {
    queryClient.invalidateQueries({ queryKey: ["incoming", "requests"] });
  });

  listenersSetup = true;
  console.log("Socket listeners set up successfully");
};

export const resetListeners = () => {
  listenersSetup = false;
};
