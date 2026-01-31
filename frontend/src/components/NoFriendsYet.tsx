import { Alert, AlertTitle } from "@/components/ui/alert";

const NoFriendsYet = () => {
  return (
    <>
      <div className="mx-1 my-2">
        <Alert>
          <AlertTitle className="text-gray-500 text-sm">
            No Friends yet
          </AlertTitle>
        </Alert>
      </div>
    </>
  );
};

export default NoFriendsYet;
