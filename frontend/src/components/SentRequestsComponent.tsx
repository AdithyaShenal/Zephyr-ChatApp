import useSentRequests from "@/hooks/useSentRequests";
import NoPendingRequests from "./NoPendingRequests";
import SentRequestCard from "./Cards/SentRequestCard";

const SentRequestsComponent = () => {
  const { data: sentReqs } = useSentRequests();

  return (
    <>
      <div>
        {sentReqs?.length === 0 ? (
          <NoPendingRequests />
        ) : (
          sentReqs?.map((req) => (
            <li key={req._id}>
              <SentRequestCard cardProps={req} />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default SentRequestsComponent;
