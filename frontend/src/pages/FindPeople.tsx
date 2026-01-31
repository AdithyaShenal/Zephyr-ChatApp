import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";

import PeopleCard from "@/components/PeopleCard";
import useGetPeople from "@/hooks/useGetPeople";
import { Outlet, useNavigate } from "react-router-dom";
import ErrorCard from "@/components/ErrorCard";

const FindPeople = () => {
  const navigate = useNavigate();
  const { data: people, isLoading, isError, error } = useGetPeople();

  return (
    <div className="grid md:grid-cols-2 gap-2 h-dvh overflow-hidden">
      <div className="flex flex-col py-2 px-2 border-r h-full overflow-hidden">
        <div className="flex justify-between items-center gap-2 mb-2 shrink-0">
          <p className="font-semibold p-2 whitespace-nowrap">Find People</p>
          <InputGroup className="w-full">
            <InputGroupInput placeholder="Type to search..." />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="secondary">Search</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {isError && (
            <ErrorCard
              errorDetails={error.response?.data.message}
              errorTitle={error.message}
            />
          )}
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="mb-2 border p-3 mt-1 rounded-md border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </li>
            ))}
          {people?.map((person) => (
            <li key={person._id}>
              <PeopleCard peopleProps={person} />
            </li>
          ))}
        </div>
      </div>

      <div className="flex flex-col py-2 pr-2 h-full overflow-hidden">
        <div className="mb-3 shrink-0">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger onClick={() => navigate(".")}>
                Incoming Requests
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger onClick={() => navigate("sentRequests")}>
                Sent Requests
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FindPeople;
