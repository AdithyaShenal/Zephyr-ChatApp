import { CircleUserIcon, Wind } from "lucide-react";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

function NavBar() {
  const { mutate: logOut } = useLogout();
  const { user } = useAuthStore();

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden h-14 md:flex justify-between items-center px-4 border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Wind />
            <p>WindTalk</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/homePage">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
            <Link to="/people">
              <Button variant="ghost" size="sm">
                Find People
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <Button variant="ghost" size="sm" onClick={() => logOut()}>
              Log out
            </Button>
          </div>
          <Link
            to="/profilePage"
            className="border rounded-full border-black/30 hover:border-black/80"
          >
            <img
              src={user.profilePic || "https://github.com/person.png"}
              alt="profile picture"
              className="size-10 rounded-full object-cover"
            />
          </Link>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="h-10 md:hidden flex justify-between items-center p-2 shadow-sm">
        <div>
          <Button size="sm" variant="outline">
            -
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Wind />
          <p>WindTalk</p>
        </div>
        <div>
          <CircleUserIcon />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
