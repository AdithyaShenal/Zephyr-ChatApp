import { MessageSquare } from "lucide-react";
import WhatsappBg from "../assets/whatsapp.png";

const NoChatSelected = () => {
  return (
    <div
      className="h-full flex items-center justify-center
        bg-white/85 dark:bg-black/70 
          bg-blend-lighten dark:bg-blend-darken"
      style={{ backgroundImage: `url(${WhatsappBg})` }}
    >
      <div className="flex flex-col items-center gap-4 rounded-lg border bg-white border-gray-300 px-20 py-20 text-center">
        <MessageSquare strokeWidth={1} className="w-10 h-10 text-gray-400" />

        <h2 className="font-semibold text-gray-500 ">No chat selected</h2>

        <p className="text-gray-400 max-w-md">
          Choose a conversation from the left to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
