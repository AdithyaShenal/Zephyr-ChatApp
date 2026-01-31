import { Alert, AlertTitle } from "@/components/ui/alert";

const NoChatsYet = () => {
  return (
    <>
      <div className="mx-1 my-2">
        <Alert>
          <AlertTitle className="text-gray-500 text-sm">
            No Chats yet
          </AlertTitle>
        </Alert>
      </div>
    </>
  );
};

export default NoChatsYet;
