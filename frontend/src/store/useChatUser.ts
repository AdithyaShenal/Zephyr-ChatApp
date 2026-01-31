import type { FriendProps } from "@/hooks/useGetFriends";
import { create } from "zustand";

interface ChatUserStore {
  chatUser: FriendProps | null;
  setChatUser: (user: FriendProps) => void;
  resetChatUser: () => void;
}

export const useChatUserStore = create<ChatUserStore>((set) => ({
  chatUser: null,

  setChatUser: (chatUser) => set({ chatUser }),

  resetChatUser: () => set({ chatUser: null }),
}));
