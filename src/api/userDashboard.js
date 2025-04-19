export const updateUserAccount = async ({
  axios,
  submitData,
  setIsUser,
  toast,
  setDashboardLoad, 
}) => {
  try {
    if (setDashboardLoad) setDashboardLoad(true); 

    const res = await axios.put("/api/user/account/update", submitData);

    if (res.data.success) {
      setIsUser?.(res.data.user); 
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message || "Something went wrong");
    }

    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update account");
    console.error("Update Account Error:", error);
    return { success: false, error };
  } finally {
    if (setDashboardLoad) setDashboardLoad(false); 
  }
};
