import React from 'react';
import { Search, MessageCircle, Bell, Menu } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { adminDefaultPic } from '../../assets/images/assets';
import { useAppContext } from '../../context/AppContext';

export default function Header() {
  const isMobile = useIsMobile();
  const { user, isAdmin } = useAppContext();
  return (
    <div className={`flex flex-col md:flex-row justify-end items-start md:items-center p-4  md:space-y-0 ${isMobile  && 'hidden'}`}>
      <div className="flex items-end w-full md:w-auto space-x-2 md:space-x-4">
        <div className="relative flex-1 md:flex-none cursor-pointer">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            className="bg-gray-100 pl-10 pr-4 py-2 rounded-full w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Search"
            aria-label="Search"
          />
        </div>

        {!isMobile && (
          <>
            <button className="relative p-2 cursor-pointer" aria-label="Messages">
              <MessageCircle className="h-6 w-6 text-gray-500" />
            </button>
            <button className="relative p-2 cursor-pointer" aria-label="Notifications ">
              <Bell className="h-6 w-6 text-gray-500" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full"></span>
            </button>
          </>
        )}
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
          { user && <img
            src={user.profilePicture  ? user.profilePicture :  adminDefaultPic}
            alt="User profile"
            className="h-full w-full object-cover"
          />}
          { isAdmin && <img
            src={isAdmin.profilePicture  ? isAdmin.profilePicture :  adminDefaultPic}
            alt="User profile"
            className="h-full w-full object-cover"
          />}
        </div>
      </div>
    </div>
  );
}
