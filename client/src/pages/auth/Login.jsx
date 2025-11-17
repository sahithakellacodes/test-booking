import React from "react";
import { useForm } from "react-hook-form";
import * as fetchAPI from "../../fetchAPI";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import EmailInput from "../../components/EmailInput";

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

  // Return the form
  return (
    <form
      className="flex flex-col p-6 gap-5 border rounded-lg shadow-xl shadow-gray-100 md:w-2/3 lg:w-1/3 mx-auto"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl  font-bold">Login</h2>
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
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
