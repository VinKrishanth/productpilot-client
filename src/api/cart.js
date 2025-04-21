import { getUserOrders } from "./userDashboard"


export const updateCart = async (axios, cartItems, toast) => {
    try {
      const { data } = await axios.post('/api/cart/update', { cartItems });
  
      if (data.success) {
        // toast.success('Cart updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update cart.');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong while updating the cart.');
      console.error('Error updating cart:', error);
    }
};
  
export const checkoutCOD = async(axios, credentials, toast, setDashboardLoad,setCartItems, navigate, setUserOrders ) =>{
  setDashboardLoad(true);
  try {
    const { data } = await axios.post('/api/user/order/cod', { credentials });
    if(data.success){
      toast.success(data.message);
      setCartItems({});
      await getUserOrders(axios, setUserOrders);
      navigate('/customer');
    }
  } catch (err) {
    toast.error("Something went wrong!");
  } finally {
    setDashboardLoad(false);
  }
  
}

export const checkoutOnline = async(axios, credentials, toast, setDashboardLoad, setCartItems, navigate, setUserOrders) =>{
  console.log(credentials);
  setDashboardLoad(true);
  try {
    const { data } = await axios.post('/api/user/order/stripe', { credentials });
    if(data.success){
      window.location.replace(data.url);
    }else{
      toast.error(data.message)
    }
  } catch (err) {
    toast.error("Something went wrong!");
  } finally {

    setDashboardLoad(false);
  }
}


