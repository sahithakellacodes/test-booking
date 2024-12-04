import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AddListing from "./pages/listings/AddListing";
import MyListing from "./pages/listings/MyListing";
import { useAppContext } from "./contexts/AppContext";


const App = () => {
  // deconstruct the isLoggedIn state from the context
  const {isLoggedIn} = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
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
          </>
        )}

        {/* Catch all: Redirect to home page if no route matches */} 
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
