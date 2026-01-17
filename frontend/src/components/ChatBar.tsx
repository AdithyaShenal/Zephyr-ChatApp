import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

interface Props {
  onSend: (text: string) => void;
}

const ChatBar = ({ onSend }: Props) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t">
      <InputGroup className="h-12">
        <InputGroupInput
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="outline" size="icon-sm">
            <Paperclip className="w-4 h-4" />
          </InputGroupButton>

          <InputGroupButton
            size="icon-sm"
            onClick={handleSend}
            disabled={!text.trim()}
          >
            <Send className="w-4 h-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default ChatBar;
