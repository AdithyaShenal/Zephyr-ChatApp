import clsx from "clsx";

interface Props {
  isMe: boolean;
  text: string;
  time: string;
}

const MessageBubble = ({ isMe, text, time }: Props) => {
  return (
    <div
      className={clsx(
        "flex w-full mb-2",
        isMe ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={clsx(
          "max-w-[70%] px-4 py-2 rounded-2xl text-md leading-relaxed",
          isMe
            ? "bg-blue-500 text-white rounded-br-md"
            : "bg-gray-100 text-gray-800 rounded-bl-md",
        )}
      >
        <p>{text}</p>
        <div
          className={clsx(
            "text-[12px] mt-1 text-right",
            isMe ? "text-blue-100" : "text-gray-400",
          )}
        >
          {time}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
