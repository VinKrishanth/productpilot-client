/**
 * Logs in a user or admin using provided credentials.
 * @param {Object} axios - Axios instance.
 * @param {string} role - "user" or "admin"
 * @param {Function} setIsAuth - Setter for auth state
 * @param {Object} credentials - { email, password }
 * @returns {Object} - Response data
 */
export const loginAuth = async (axios, role, setIsAuth, setRole, setIsUser, setIsAdmin, credentials) => {
  try {
    const endpoint = role === 'user' ? '/api/auth/user/login' : '/api/admin/login';
    const response = await axios.post(`${endpoint}`, credentials);

    if (response.data.success) {
      const storedRole = role === 'user' ? response.data.user.role : response.data.admin.role;
      localStorage.setItem("role", storedRole); 
      setRole(storedRole);    
      setIsAuth(true);
      if(storedRole === 'user'){
        setIsUser(response.data.user);
      }else{
        setIsAdmin(response.data.admin);
      }
                                          
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};




/**
 * Registers a new user.
 * @param {Object} axios - Axios instance.
 * @param {Object} credentials - { email, password }
 * @returns {Object} - Response data
 */
export const registerUser = async (axios, navigate, setIsUser, setIsAuth, credentials, setRole) => {
  try {
    const response = await axios.post('/api/auth/user/register', credentials);
    if(response.data.success){
      localStorage.setItem("role", response.data.user.role); 
      setIsUser(response.data.user);
      setRole(response.data.user.role);    
      setIsAuth(true);
      navigate('/shop');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};



/**
 * Checks if an admin is authenticated.
 * @param {Object} axios - Axios instance.
 * @param {string} role - "admin"
 * @param {Function} setIsAdmin - Setter for admin state
 */
export const fetchAdmin = async (axios, role) => {
  try {
    if (role === 'admin') {
      const response = await axios.get("/api/admin/is-auth");
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error('[fetchAdmin Error]', error.message);
  }
};





/**
 * Fetches authenticated user and cart info.
 * @param {Object} axios - Axios instance.
 * @param {string} role - "user"
 * @param {Function} setIsUser - Setter for user state
 * @param {Function} setCartItems - Setter for cart state
 */
export const fetchUser = async (axios, role) => {
  try {
    if (role === 'user') {
      const response = await axios.get("/api/auth/user/is-auth");
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error('[fetchUser Error]', error.message);
  }
};




/**
 * Logs out a user or admin.
 * @param {Object} axios - Axios instance.
 * @param {string} role - "user" or "admin"
 * @param {Function} navigate - React router navigation function (optional)
 * @param {Function} setShowUserLogin - Setter to show login UI
 * @returns {Object} - Response data
 */
export const logout = async (axios, role, navigate, setIsAuth,updateCart) => {
  try {
    const endpoint = role === "admin" ? "/api/admin/logout" : "/api/auth/user/logout";
    const response = await axios.post(endpoint);

    if (response.data.success) {
      setIsAuth(false);
      updateCart({})
      localStorage.removeItem("role");
      if (navigate) navigate("/");
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

