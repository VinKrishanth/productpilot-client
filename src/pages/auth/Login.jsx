import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { loginAuth } from "../../api/auth";
import { useAppContext } from "../../context/AppContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthLog, setIsAuthLog] = useState("user");

  const { axios, navigate, setIsAuth, setRole, setIsUser, setIsAdmin } =
    useAppContext();
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await loginAuth(
        axios,
        isAuthLog, // either "user" or "admin"
        setIsAuth,
        setRole,
        setIsUser,
        setIsAdmin,
        { email, password }
      );

      setLoading(false);

      if (data.success) {
        toast.success("Login successful!");

        if (data.user?.role === "user") {
          navigate("/shop");
        } else if (data.admin?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-cover bg-center py-12">
        <div className="bg-white rounded-lg sm:shadow-md p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

          {/* Tabs */}
          <div className="flex  mb-6  w-full cursor-pointer ">
            <button
              onClick={() => setIsAuthLog("user")}
              className={`px-4 py-2 text-sm font-medium rounded-l-xl  cursor-pointer uppercase flex-1/2    ${
                isAuthLog === "user"
                  ? "bg-gray-100 text-gray-600 "
                  : "bg-gray-300/10 text-black "
              }`}
            >
              User
            </button>
            <button
              onClick={() => setIsAuthLog("admin")}
              className={`px-4 py-2 text-sm font-medium rounded-r-xl uppercase  cursor-pointer  flex-1/2 ${
                isAuthLog === "admin"
                  ? "bg-gray-100 text-gray-600 "
                  : "bg-gray-300/10 text-black "
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                required
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-eco-green focus:border-eco-green text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-eco-green focus:border-eco-green text-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 focus:ring-eco-green"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white font-semibold px-6 py-3 rounded-md transition duration-200`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Redirect */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-eco-green font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
