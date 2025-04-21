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

export const createUserAddress = async ({
  axios,
  address,
  toast,
  setDashboardLoad,
  setUserAddress
}) => {
  try {
   
    
    if (setDashboardLoad) setDashboardLoad(true);

    const res = await axios.post("/api/user/address/add", {address});

    if (res.data.success) {
      toast.success(res.data.message);
      setUserAddress(res.data.newAddress);
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

export const updateUserAddress = async ({
  axios,
  address,
  toast,
  setDashboardLoad,
  setUserAddress
}) => {
  try {
   
    
    if (setDashboardLoad) setDashboardLoad(true);

    const res = await axios.put("/api/user/address/update", {address});

    if (res.data.success) {
      toast.success(res.data.message);
      setUserAddress(res.data.newAddress);
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



export const getUserAddress = async (axios, setUserAddress) => {
  try {
    const response = await axios.get("/api/user/address");

    if (response.data.success) {
      setUserAddress(response.data.address);
    } else {
      toast.error('Failed to fetch address');
    }
  } catch (error) {
    console.error('Error fetching address:', error.message);
    toast.error('Error fetching address');
  }
};


export const getUserOrders = async (axios, setUserOrders) => {
  try {
    const response = await axios.get("/api/user/order");

    if (response.data.success) {
      setUserOrders(response.data.orders);
    } else {
      toast.error('Failed to fetch address');
    }
  } catch (error) {
    console.error('Error fetching address:', error.message);
    toast.error('Error fetching address');
  }
};