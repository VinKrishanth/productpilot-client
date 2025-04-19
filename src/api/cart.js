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
  