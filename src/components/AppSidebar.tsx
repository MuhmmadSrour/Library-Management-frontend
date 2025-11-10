import { token, UserInfo } from "@/context/signal";
import { useSignals } from "@preact/signals-react/runtime";
import { deleteCookie } from "cookies-next";
import { useState } from "react";
import { FaBookReader, FaUsers } from "react-icons/fa";
import { IoIosHome, IoMdLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";
function AppSidebar() {
  useSignals();
  const [isLogOut, setIsLogOut] = useState<boolean>(false);
  return (
    <Sidebar className="bg-brown-100     ">
      <SidebarHeader className="capitalize font-medium text-2xl mb-4 p-4 ">
        Imagination library
      </SidebarHeader>
      <div className="border-b border-brown-500 w-full mb-4 "></div>
      <SidebarContent className="p-2">
        {UserInfo.value?.type == "ADMIN" ? (
          <>
            <NavLink to="/admin/home">
              <div className="flex gap-4 items-center  p-2 text-lg hover:bg-brown-500 hover:text-white cursor-pointer">
                <span>
                  <IoIosHome />
                </span>
                <span>Home</span>
              </div>
            </NavLink>
            <NavLink to="/admin/employees">
              <div className="flex gap-4 items-center  p-2 text-lg hover:bg-brown-500 hover:text-white cursor-pointer">
                <span>
                  <FaUsers />
                </span>
                <span>Employee</span>
              </div>
            </NavLink>
            <NavLink to="/admin/books">
              <div className="flex gap-4 items-center  p-2 text-lg hover:bg-brown-500 hover:text-white cursor-pointer">
                <span>
                  <FaUsers />
                </span>
                <span>books</span>
              </div>
            </NavLink>
            <Dialog open={isLogOut} onOpenChange={setIsLogOut}>
              <DialogTrigger className="flex gap-4 items-center  p-2 text-lg hover:bg-brown-500 hover:text-white cursor-pointer">
                <IoMdLogOut />
                log out
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Are you sure you want to log out?</DialogTitle>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      deleteCookie("token-test");
                      token.value = "";
                    }}
                  >
                    log out
                  </Button>
                  <Button onClick={() => setIsLogOut(false)}>cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <>
            <NavLink to="/employee/home">
              <div className="flex gap-4 items-center  p-2 text-lg hover:bg-brown-500 hover:text-white cursor-pointer">
                <span>
                  <FaBookReader />
                </span>
                <span>Loan requests</span>
              </div>
            </NavLink>
            <Dialog open={isLogOut} onOpenChange={setIsLogOut}>
              <DialogTrigger className="flex gap-4 items-center  p-2 text-lg hover:bg-brown-500 hover:text-white cursor-pointer">
                <IoMdLogOut />
                log out
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Are you sure you want to log out?</DialogTitle>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      deleteCookie("token-test");
                      token.value = "";
                    }}
                  >
                    log out
                  </Button>
                  <Button onClick={() => setIsLogOut(false)}>cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
