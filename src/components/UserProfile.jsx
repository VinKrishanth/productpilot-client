import React from "react";
import { profilePic } from '../assets/images/assets'

export default function UserProfile() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm mx-auto flex flex-col items-center text-center sm:m-0 m-4">
      <div className="h-24 w-24 mb-4 rounded-full overflow-hidden">
        <img
          src={profilePic}
          alt="Dianne Russell"
          className="h-full w-full object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-900">Dianne Russell</h2>
      <p className="text-gray-500 text-sm mb-4">Customer</p>
      <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
        Edit Profile
      </button>
    </div>
  );
}
