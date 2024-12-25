import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AddListing from "./pages/listings/AddListing";
import ListingDetails from "./pages/listings/ListingDetails";
import EditListing from "./pages/listings/EditListing";
import MyListing from "./pages/listings/MyListing";
import { useAppContext } from "./contexts/AppContext";
import SearchBar from "./components/SearchBar";
import Search from "./pages/search/Search";
import Booking from "./pages/bookings/Booking";
import PageNotFound from "./pages/pagenotfound/PageNotFound";

const App = () => {
  // deconstruct the isLoggedIn state from the context
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/page-not-found"
          element={
            <Layout>
              <PageNotFound />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <SearchBar />
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/user/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/user/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <SearchBar />
              <Search />
            </Layout>
          }
        />
        <Route
          path="/listing/details/:listingId"
          element={
            <Layout>
              <ListingDetails />
            </Layout>
          }
        />

        {isLoggedIn && ( // Routes available only to logged in users
          <>
            <Route
              path="/listings/create"
              element={
                <Layout>
                  <AddListing />
                </Layout>
              }
            />
            <Route
              path="/listings/viewAll"
              element={
                <Layout>
                  <MyListing />
                </Layout>
              }
            />
            <Route
              path="/listings/edit/:listingId"
              element={
                <Layout>
                  <EditListing />
                </Layout>
              }
            />
            <Route
              path="/listings/:listingId/book"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
          </>
        )}

        {/* Catch all: Redirect to home page if no route matches */}
        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
