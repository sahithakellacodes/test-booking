const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Register user API
export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

// Validate token API
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include", // we need to send these cookies to validate the token
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

// Login user API
export const login = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

// Logout user API
export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

// Create a new listing API
export const addListing = async (listingData) => {
  const response = await fetch(`${API_BASE_URL}/api/myListings`, {
    method: "POST",
    credentials: "include",
    body: listingData,
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(`Error adding property listing: ${responseBody.message}, ${response.status}`);
  }
  return {message: "Add Listing success!", data: responseBody};
};

// Get all listings API
export const getListings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/myListings`, {
    method:"GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching property listings");
  }
  const responseBody = await response.json();
  return responseBody;
};