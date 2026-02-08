import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Inbox, Send, Search as SearchIcon, X } from "lucide-react";

import PeopleCard from "@/components/PeopleCard";
import useGetPeople from "@/hooks/useGetPeople";
import { Outlet, useNavigate } from "react-router-dom";
import ErrorCard from "@/components/ErrorCard";
import { useState } from "react";

const FindPeople = () => {
  const navigate = useNavigate();

  // For mobile view toggle
  const [showRequestsOnMobile, setShowRequestsOnMobile] = useState(false);

  // Search state
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: people, isLoading, isError, error } = useGetPeople(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden h-dvh overflow-hidden">
        {!showRequestsOnMobile ? (
          // People List View
          <div className="flex flex-col py-2 px-2 h-full overflow-hidden">
            <div className="flex flex-col gap-2 mb-3 shrink-0">
              <p className="font-semibold text-lg px-2">Find People</p>
              <form onSubmit={handleSearch}>
                <InputGroup className="w-full">
                  <InputGroupInput
                    placeholder="Search by name or email..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    {searchInput && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleClearSearch}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <InputGroupButton variant="secondary" type="submit">
                      <SearchIcon className="h-4 w-4" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </form>

              {/* Mobile Requests Button */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    setShowRequestsOnMobile(true);
                    navigate(".");
                  }}
                >
                  <Inbox className="h-4 w-4" />
                  Incoming
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    setShowRequestsOnMobile(true);
                    navigate("sentRequests");
                  }}
                >
                  <Send className="h-4 w-4" />
                  Sent
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {searchQuery && (
                <div className="px-2 py-1 mb-2 text-sm text-muted-foreground">
                  Searching for:{" "}
                  <span className="font-medium">{searchQuery}</span>
                </div>
              )}

              {isError && (
                <ErrorCard
                  errorDetails={error.response?.data.message}
                  errorTitle={error.message}
                />
              )}

              {isLoading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="mb-2 border p-3 rounded-md border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full max-w-[200px]" />
                        <Skeleton className="h-4 w-full max-w-[150px]" />
                      </div>
                    </div>
                  </div>
                ))}

              {!isLoading && people?.length === 0 && searchQuery && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No people found matching "{searchQuery}"</p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={handleClearSearch}
                  >
                    Clear search
                  </Button>
                </div>
              )}

              {!isLoading && people?.length === 0 && !searchQuery && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No people to show</p>
                </div>
              )}

              {people?.map((person) => (
                <div key={person._id}>
                  <PeopleCard peopleProps={person} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Requests View
          <div className="flex flex-col py-2 px-2 h-full overflow-hidden">
            <div className="flex items-center gap-2 mb-3 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowRequestsOnMobile(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <p className="font-semibold text-lg">Friend Requests</p>
            </div>

            <div className="mb-3 shrink-0">
              <Menubar className="w-full">
                <MenubarMenu>
                  <MenubarTrigger
                    onClick={() => navigate(".")}
                    className="flex-1 justify-center"
                  >
                    Incoming
                  </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger
                    onClick={() => navigate("sentRequests")}
                    className="flex-1 justify-center"
                  >
                    Sent
                  </MenubarTrigger>
                </MenubarMenu>
              </Menubar>
            </div>

            <div className="flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-2 gap-2 h-dvh overflow-hidden">
        <div className="flex flex-col py-2 px-2 border-r h-full overflow-hidden">
          <div className="flex justify-between items-center gap-2 mb-2 shrink-0">
            <p className="font-semibold p-2 whitespace-nowrap">Find People</p>
            <form onSubmit={handleSearch} className="w-full">
              <InputGroup className="w-full">
                <InputGroupInput
                  placeholder="Search by name or email..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  {searchInput && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleClearSearch}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <InputGroupButton variant="secondary" type="submit">
                    Search
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            {searchQuery && (
              <div className="px-2 py-1 mb-2 text-sm text-muted-foreground">
                Searching for:{" "}
                <span className="font-medium">{searchQuery}</span>
              </div>
            )}

            {isError && (
              <ErrorCard
                errorDetails={error.response?.data.message}
                errorTitle={error.message}
              />
            )}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <div
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
                </div>
              ))}

            {!isLoading && people?.length === 0 && searchQuery && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No people found matching "{searchQuery}"</p>
                <Button
                  variant="link"
                  className="mt-2"
                  onClick={handleClearSearch}
                >
                  Clear search
                </Button>
              </div>
            )}

            {!isLoading && people?.length === 0 && !searchQuery && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No people to show</p>
              </div>
            )}

            {people?.map((person) => (
              <div key={person._id}>
                <PeopleCard peopleProps={person} />
              </div>
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
    </>
  );
};

export default FindPeople;
