import { Alert, AlertTitle } from "@/components/ui/alert";

const NoPendingRequests = () => {
  return (
    <>
      <div>
        <Alert>
          <AlertTitle className="text-gray-500 text-sm">
            No pending requests.
          </AlertTitle>
        </Alert>
      </div>
    </>
  );
};

export default NoPendingRequests;
