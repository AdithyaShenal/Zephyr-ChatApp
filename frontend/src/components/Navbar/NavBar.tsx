import { CircleUserIcon, LogOut, UserPen, Wind } from "lucide-react";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import userProfileAlter from "../../assets/userProfile.png";
import { useTheme } from "../Theme/theme-provider";
import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { HelpCircleIcon } from "lucide-react";

function NavBar() {
  const { mutate: logOut } = useLogout();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  return (
    <>
      {/* Desktop Nav */}

      <nav className="hidden h-14 md:flex justify-between items-center px-4 border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Wind />
            <p className="racing-sans text-xl">Zephyr</p>
          </div>
          <div className="flex items-center gap-2 ml-10">
            <NavLink
              to="/homePage"
              className={({ isActive }) =>
                `${isActive ? "border rounded-md bg-black/5" : ""}`
              }
            >
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </NavLink>
            <NavLink
              to="/people"
              className={({ isActive }) =>
                `${isActive ? "border rounded-md bg-black/5" : ""}`
              }
            >
              <Button variant="ghost" size="sm">
                Find People
              </Button>
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="p-0 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                  <div className="border-3  rounded-full border-black/30 hover:border-black/40 transition-colors cursor-pointer">
                    <img
                      src={user.profilePic || userProfileAlter}
                      alt="profile picture"
                      className="size-10 rounded-full object-cover"
                    />
                  </div>
                </MenubarTrigger>

                <MenubarContent className="mt-2 mr-2">
                  <MenubarGroup>
                    <MenubarItem onClick={() => navigate("/profilePage")}>
                      <UserPen className="mr-2 size-4" />
                      Profile
                    </MenubarItem>
                    <MenubarItem>
                      <HelpCircleIcon className="mr-2 size-4" />
                      Help
                    </MenubarItem>
                    <MenubarSeparator />
                    <DialogTrigger asChild>
                      <MenubarItem className="text-red-500 focus:bg-red-50">
                        <LogOut className="mr-2 size-4" />
                        Log out
                      </MenubarItem>
                    </DialogTrigger>
                  </MenubarGroup>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <form>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Log out</DialogTitle>
                  <DialogDescription>
                    You’ll need to sign in again to access your account.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    type="submit"
                    onClick={() => logOut()}
                  >
                    Log out
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
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

      {/* Modal for confirm logout */}
    </>
  );
}

export default NavBar;
