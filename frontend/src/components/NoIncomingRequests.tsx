import { Alert, AlertTitle } from "@/components/ui/alert";

const NoIncomingRequests = () => {
  return (
    <>
      <div>
        <Alert>
          <AlertTitle className="text-gray-500 text-sm">
            No Incoming Requests
          </AlertTitle>
        </Alert>
      </div>
    </>
  );
};

export default NoIncomingRequests;
