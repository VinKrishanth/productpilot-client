export const addProduct = async (axios, credentials, setProducts, toast, isAdmin) => {
  try {
    const response = await axios.post(`/api/admin/products/add`, credentials);
    if (response.data.success) {
      // Refetch updated product list
      await fetchAllProducts(axios, setProducts, toast, isAdmin);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

  

export const fetchAllProducts = async (axios, setProducts, toast, isAdmin) => {
  try {
    const endpoint = isAdmin === 'admin' ? '/api/admin/products/getAllProducts' : '/api/products/getProducts';
    const response = await axios.get(`${endpoint}`);
    if (response.data.success) {
      setProducts(response.data.products);
    } else {
      toast.error(response.data.message || "Failed to fetch products.");
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong while fetching products.");
    console.error("Fetch Products Error:", error);
  } 
};




