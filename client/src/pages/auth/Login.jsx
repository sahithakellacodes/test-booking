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
  const from = location.state?.from || "/";

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
      navigate(from);
    },
    onError: (error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data); // calls useMutation which calls fetchAPI.login
  });

  // Local components
  const EmailInput = () => (
    <label className="text-sm font-bold flex-1">
      Email
      <input
        type="email"
        autoComplete="email"
        className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-1 focus:ring-gray-500"
        {...register("email", { required: "Email is required" })}
      ></input>
      {errors.email && (
        <span className="text-red-500 text-sm font-light">
          {errors.email.message}
        </span>
      )}
    </label>
  );
  const PasswordInput = () => (
    <label className="text-sm font-bold flex-1">
      Password
      <input
        type="password"
        className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-1 focus:ring-gray-500"
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
  );

  // Return the form
  return (
    <form
      className="flex flex-col p-6 gap-5 border rounded-lg shadow-xl shadow-gray-100 md:w-2/3 lg:w-1/3 mx-auto"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl  font-bold">Login</h2>
      <EmailInput />
      <PasswordInput />
      <span className="flex justify-between flex-col md:flex-row">
        <p className="font-light text-xs">
          Don't have an account?{" "}
          <a href="/user/register">
            <u>register</u>
          </a>{" "}
          instead
        </p>
        <button
          type="submit"
          className="text-white bg-black rounded-md px-4 py-2 mt-5 md:mt-0"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;
