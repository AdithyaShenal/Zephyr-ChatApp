import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { Button } from "../ui/button";

const Sidebar = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/message/users");
      return res.data.result;
    },
  });

  if (isLoading) return <>Loading...</>;

  if (isError) return <>{error.message}</>;

  return (
    <>
      <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {users.map((user) => (
            <Button
              key={user._id}
              onClick={() => {
                console.log(user);
              }}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || ""}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
              </div>
            </Button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
