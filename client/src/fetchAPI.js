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
    throw new Error(
      `Error adding property listing: ${responseBody.message}, ${response.status}`
    );
  }
  return { message: "Add Listing success!", data: responseBody };
};

// Get all listings API
export const getListings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/myListings`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching property listings");
  }
  const responseBody = await response.json();
  return responseBody;
};

// Get one listing API
export const getListingByID = async (listingId) => {
  const response = await fetch(`${API_BASE_URL}/api/myListings/${listingId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching property listing");
  }
  return await response.json();
};

// Update a listing API
export const updateListingByID = async (listingId, listingData) => {
  console.log("DATA IN FETCH API");
  for (let pair of listingData.entries()) {
    console.log("FormDataOBJ01:", pair[0] + ": " + pair[1]);
  }
  const response = await fetch(`${API_BASE_URL}/api/myListings/${listingId}`, {
    method: "PUT",
    credentials: "include",
    body: listingData,
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error("Error updating property listing");
  }
  return { message: "Listing updated successfully!", data: responseBody };
};

// Delete a listing API
export const deleteListingById = async (listingId) => {
  const response = await fetch(`${API_BASE_URL}/api/myListings/${listingId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error("Error deleting property listing");
  }
  return { message: "Listing deleted successfully!", data: responseBody };
};

// Search listings API
export const searchListings = async (searchParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");
  searchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  });
  searchParams.types?.forEach((type) => {
    queryParams.append("types", type);
  });
  searchParams.stars?.forEach((star) => {
    queryParams.append("stars", star);
  });

  const response = await fetch(
    `${API_BASE_URL}/api/listings/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching property listings");
  }
  return response.json();
};

// Get details of a listing by ID API
export const getListingDetailsById = async (listingId) => {
  const response = await fetch(`${API_BASE_URL}/api/listings/${listingId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching property listing");
  }
  return await response.json();
};
