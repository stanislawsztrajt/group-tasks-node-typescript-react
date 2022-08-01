import * as Yup from "yup";
import { IsignUpValues } from "types/interfaces";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const initialValues: IsignUpValues = {
  name: "",
  email: "",
  password: "",
  repeatedPassword: "",
};

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, "Password must be longer than 6 chars")
    .max(30, "Password must be shorter than 30 chars")
    .required("Required"),
  email: Yup.string()
    .min(6, "Password must be longer than 6 chars")
    .max(30, "Password must be shorter than 30 chars")
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(6, "Password must be longer than 6 chars")
    .max(30, "Password must be shorter than 30 chars")
    .required("Required"),
  repeatedPassword: Yup.string()
    .min(6, "Password must be longer than 6 chars")
    .max(30, "Password must be shorter than 30 chars")
    .required("Required")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

const useSignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const signUp = async (user: IsignUpValues) => {
    setLoading(true);
    try {
      const userWithoutRepeatedPassword = JSON.parse(JSON.stringify(user));
      delete userWithoutRepeatedPassword.repeatedPassword;

      await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        userWithoutRepeatedPassword
      );
      navigate("/auth/login");
    } catch (error) {
      setError("Name or email already exist");
    }
    setLoading(false);
  };

  return {
    initialValues,
    signUpSchema,
    signUp,
    loading,
    error,
  };
};
export default useSignUp;
