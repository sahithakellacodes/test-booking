import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as fetchAPI from "../../fetchAPI";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Get all the hooks we need
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Use useMutation hook to handle data modification (registering a user)
  const mutation = useMutation(fetchAPI.register, {
    onSuccess: async () => {
      showToast({ message: "Registered successfully!", type: "success" });
      // Invalidating queries triggers a refetch of the data, ensuring stale data is updated.
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const UsernameInput = () => (
    <label className=" text-sm font-bold flex-1">
      Username
      <input
        className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-1 focus:ring-gray-500"
        {...register("username", { required: "Username is required" })}
      ></input>
      {errors.username && (
        <span className="text-red-500 text-sm font-light">
          {errors.username.message}
        </span>
      )}
    </label>
  );
  const EmailInput = () => (
    <label className=" text-sm font-bold flex-1">
      Email
      <input
        type="email"
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
    <label className=" text-sm font-bold flex-1">
      Password
      <input
        type="password"
        className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-1 focus:ring-gray-500"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
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
  const ConfirmPasswordInput = () => (
    <label className=" text-sm font-bold flex-1">
      Confirm Password
      <input
        type="password"
        className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-1 focus:ring-gray-500"
        {...register("confirmPassword", {
          validate: (val) => {
            if (!val) {
              return "Please confirm password";
            } else if (watch("password") !== val) {
              return "Your passwords do no match";
            }
          },
        })}
      ></input>
      {errors.confirmPassword && (
        <span className="text-red-500 text-sm font-light">
          {errors.confirmPassword.message}
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
      <h2 className="text-3xl  font-bold">Create an account</h2>
      <UsernameInput />
      <EmailInput />
      <PasswordInput />
      <ConfirmPasswordInput />
      <span className="flex justify-between flex-col md:flex-row">
        <p className="font-light text-xs ">
          Already registered?{" "}
          <a href="/user/login">
            <u>Login</u>
          </a>{" "}
          instead
        </p>
        <button
          type="submit"
          className="text-white bg-black rounded-md px-4 py-2 text-sm disabled:opacity-50 mt-5 md:mt-0"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
