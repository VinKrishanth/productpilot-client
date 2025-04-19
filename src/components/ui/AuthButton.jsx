import { User } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { logout } from "../../api/auth";

export default function AuthButton() {
  const {
    isAuth,
    navigate,
    role,
    setIsAuth,
    setIsUser,
    setIsAdmin,
    setRole,
    axios,
    user
  } = useAppContext();

  const handleLogout = async () => {
    await logout(axios, role, navigate, setIsAuth);
    setIsUser(null);
    setIsAdmin(null);
    setRole(null);
  };


  const goTo = (path) => navigate(path);

  return (
    <div className="hidden md:flex items-center group relative">
      <button
        className="p-1 relative cursor-pointer rounded-full bg-green-500 overflow-hidden"
      >
        {
          user.profilePicture ? <img src={user.profilePicture} alt="user profile" className="w-6 h-6 scale-200 object-cover" /> : <User className="h-6 w-6 text-white" />
        }
        
      </button>

      {/* Hover Dropdown */}
      {isAuth ? (
        <div className="absolute top-full mt-2 right-0 w-40 bg-white border border-gray-300 rounded shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 origin-top-right z-20">
          <ul className="flex flex-col text-sm text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => role === 'user' ? goTo('/customer') : goTo('/admin')}
            >
              Dashboard
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => role === 'user' ? goTo('/customer/settings') : goTo('/admin/settings')}
            >
              Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-red-100 text-red-600 font-medium cursor-pointer border-t border-gray-200"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      ) : (
        <div className="absolute top-full mt-2 right-0 w-40 bg-white border border-gray-300 rounded shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 origin-top-right z-20">
          <ul className="flex flex-col text-sm text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => goTo('/login') }
            >
              Login
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
