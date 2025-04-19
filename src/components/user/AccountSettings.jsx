import { useState } from "react";
import { profilePic } from "../../assets/images/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { updateUserAccount } from "../../api/userDashboard.js";
import { LoaderIcon } from "lucide-react";

export default function AccountSettings() {
  const { user, setIsUser, axios, dashboardLoad, setDashboardLoad } =
    useAppContext();

  const [formData, setFormData] = useState({
    firstName: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
  });

  const [imagePreview, setImagePreview] = useState(
    user.profilePicture || profilePic
  );
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("userData", JSON.stringify(formData));
    if (imageFile) {
      submitData.append("image", imageFile);
    }

    await updateUserAccount({
      axios,
      submitData,
      setIsUser,
      toast,
      setDashboardLoad,
    });
  };

  return (
    <div className="container bg-white rounded-lg sm:shadow-sm p-6 sm:w-[90%] sm:my-30 cursor-pointer">
      <h2 className="text-xl font-medium mb-6">Account Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-md p-2 ${
                  formData.email !== "" && "bg-sky-200/50"
                }`}
                readOnly
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center space-y-4 sm:w-96 w-fit">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Choose image
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-start items-center ">
          <button
            type="submit"
            disabled={dashboardLoad}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white transition 
            ${
              dashboardLoad
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {dashboardLoad && (
              <LoaderIcon className="animate-spin h-5 w-5 text-white" />
            )}
            {dashboardLoad ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
