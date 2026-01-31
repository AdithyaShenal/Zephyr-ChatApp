import useIncomingRequests from "@/hooks/useIncomingRequests";
import NoIncomingRequests from "./NoIncomingRequests";
import IncomingRequestCard from "./Cards/IncomingRequestCard";

const IncomingRequestsComponent = () => {
  const { data: IncomingReqs } = useIncomingRequests();

  return (
    <>
      <div>
        {IncomingReqs?.length === 0 ? (
          <NoIncomingRequests />
        ) : (
          IncomingReqs?.map((req) => (
            <li key={req._id}>
              <IncomingRequestCard cardProps={req} />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default IncomingRequestsComponent;
