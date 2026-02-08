import { LogOut, UserPen, Wind, Menu, Home, Users } from "lucide-react";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import userProfileAlter from "../../assets/userProfile.png";
import { useState } from "react";

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

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

function NavBar() {
  const { mutate: logOut } = useLogout();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    logOut();
    setIsLogoutDialogOpen(false);
    setIsMenuOpen(false);
  };

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
            <div className="flex gap-2 justify-center items-center border p-2 rounded-md">
              <p className="font-bold text-xs">Online</p>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>

            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="p-0 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                  <div className="border-3 rounded-full border-black/30 hover:border-black/40 transition-colors cursor-pointer">
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
                    <MenubarItem onClick={() => navigate("/aboutPage")}>
                      <HelpCircleIcon className="mr-2 size-4" />
                      About
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

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Log out</DialogTitle>
                <DialogDescription>
                  You'll need to sign in again to access your account.
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
          </Dialog>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="h-14 md:hidden flex justify-between items-center px-4 border-b bg-background">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetHeader className="p-6 pb-4 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={user.profilePic || userProfileAlter}
                  alt="profile picture"
                  className="size-12 rounded-full object-cover border-2 border-black/10"
                />
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-left text-base truncate">
                    {user.fullName || "User"}
                  </SheetTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
              </div>
            </SheetHeader>

            <div className="flex flex-col py-4">
              <SheetClose asChild>
                <NavLink
                  to="/homePage"
                  className={({ isActive }) =>
                    `w-full ${isActive ? "bg-accent font-medium" : ""}`
                  }
                >
                  <Button
                    className="w-full justify-start gap-3 px-6 py-3"
                    variant="ghost"
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Button>
                </NavLink>
              </SheetClose>

              <SheetClose asChild>
                <NavLink
                  to="/people"
                  className={({ isActive }) =>
                    `w-full ${isActive ? "bg-accent font-medium" : ""}`
                  }
                >
                  <Button
                    className="w-full justify-start gap-3 px-6 py-3"
                    variant="ghost"
                  >
                    <Users className="h-5 w-5" />
                    <span>Find People</span>
                  </Button>
                </NavLink>
              </SheetClose>

              <div className="border-t my-4"></div>

              <SheetClose asChild>
                <Button
                  onClick={() => navigate("/profilePage")}
                  className="w-full justify-start gap-3 px-6 py-3"
                  variant="ghost"
                >
                  <UserPen className="h-5 w-5" />
                  <span>Profile</span>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  onClick={() => navigate("/aboutPage")}
                  className="w-full justify-start gap-3 px-6 py-3"
                  variant="ghost"
                >
                  <HelpCircleIcon className="h-5 w-5" />
                  <span>About</span>
                </Button>
              </SheetClose>

              <div className="border-t my-4"></div>

              <SheetClose asChild>
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLogoutDialogOpen(true);
                  }}
                  className="w-full justify-start gap-3 px-6 py-3 text-red-500 hover:text-red-500 hover:bg-red-50"
                  variant="ghost"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <Wind className="h-5 w-5" />
          <p className="font-semibold">Zephyr</p>
        </div>

        <div className="w-10"></div>
      </nav>

      {/* Mobile Logout Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log out</DialogTitle>
            <DialogDescription>
              You'll need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleLogout}>
              Log out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NavBar;
