import React from "react";
import { useForm } from "react-hook-form";
import * as fetchAPI from "../../fetchAPI";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";

const Login = () => {
  // Get all the hooks we need
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Use useMutation hook to handle data modification (login a user)
  const mutation = useMutation(fetchAPI.login, {
    onSuccess: async () => {
      showToast({ message: "Login successful!", type: "success" });
      await queryClient.invalidateQueries("validateToken"); // Invalidating queries triggers a refetch of the data, ensuring stale data is updated.
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data); // calls useMutation which calls fetchAPI.login
  });

  // Return the form
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Login</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          autoComplete="email" 
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500 text-sm font-light">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          autoComplete="current-password" 
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password required",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500 text-sm font-light">
            {errors.password.message}
          </span>
        )}
      </label>
      <span className="flex justify-between">
        <p className="font-light text-xs">Don't have an account? <a href="/user/register"><u>register</u></a> instead</p>
        <button
          type="submit"
          className="bg-black text-white p-2 px-4 rounded-full"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;
