import React from "react";
import { profilePic } from '../assets/images/assets'
import { useAppContext } from '../context/AppContext'

export default function UserProfile() {
  const { user, navigate } = useAppContext();
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm mx-auto flex flex-col items-center text-center sm:m-0 m-4">
      <div className="h-24 w-24 mb-4 rounded-full overflow-hidden">
        <img
          src={user.profilePicture ? user.profilePicture : profilePic}
          alt="Dianne Russell"
          className="h-full w-full object-cover cursor-pointer"
        />
      </div>
      <h2 className="text-xl font-semibold cursor-pointer text-gray-900 capitalize">{user? user.name + " " + user.lastName : 'customer name'}</h2>
      <p className="text-gray-500 text-sm mb-4 cursor-pointer">Customer</p>
      <button onClick={()=>{navigate('/customer/settings')}}  className="text-green-600 hover:text-green-700 font-medium transition-colors cursor-pointer">
        Edit Profile
      </button>
    </div>
  );
}
