import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as fetchAPI from "../../fetchAPI";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import EmailInput from "../../components/EmailInput";

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

  // Return the form
  return (
    <form
      className="flex flex-col p-6 gap-5 border rounded-lg shadow-xl shadow-gray-100 md:w-2/3 lg:w-1/3 mx-auto"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl  font-bold">Create an account</h2>
      <UsernameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <ConfirmPasswordInput register={register} watch={watch} errors={errors} />
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
