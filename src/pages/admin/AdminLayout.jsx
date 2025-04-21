import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { adminDefaultPic } from "../../assets/images/assets";
import Header from "../../components/admin/Header";
import { useAppContext } from "../../context/AppContext";

export default function AdminLayout() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const { user, isAdmin } = useAppContext();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto z-40 ">
        {/* Header */}
        {isMobile && (
          <div className="p-4 border-b border-gray-400 bg-white shadow-sm flex items-center justify-between md:hidden z-40 fixed top-0 right-0 left-0">
            <button onClick={toggleSidebar}>
              <Menu className="w-6 h-6 text-gray-800" />
            </button>
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
              {user && (
                <img
                  src={
                    user.profilePicture ? user.profilePicture : adminDefaultPic
                  }
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              )}

              {isAdmin && (
                <img
                  src={
                    isAdmin.profilePicture ? isAdmin.profilePicture : adminDefaultPic
                  }
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        )}

        {/* Main content that will change based on routes */}
        <main className={``}>
          <div
            className={`${
              !isMobile && "border-b border-gray-400 pb-1"
            } fixed top-0 right-0 z-10 bg-white w-full`}
          >
            <Header />
          </div>
          <div className={`${!isMobile ? " mt-20" : "mt-25"} sm:px-8 z-10`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
