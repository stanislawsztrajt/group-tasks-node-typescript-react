import * as Yup from "yup";
import { IloginValues, Iuser } from "types/interfaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkIsLogin } from "helpers/index";

interface IloginResponse {
  data: {
    jwt: string;
    user: Iuser;
  };
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(6, "Password must be longer than 6 chars")
    .max(30, "Password must be shorter than 30 chars")
    .required("Required"),

  password: Yup.string()
    .min(6, "Password must be longer than 6 chars")
    .max(30, "Password must be shorter than 30 chars")
    .required("Required"),
});

const initialValues: IloginValues = {
  email: "",
  password: "",
};

const useLogin = () => {
  checkIsLogin();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const login = async (user: IloginValues) => {
    setLoading(true);
    try {
      const { data }: IloginResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/sign-in`,
        user
      );

      localStorage.setItem("jwt", JSON.stringify(data.jwt));
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
      window.location.reload();
    } catch {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return {
    initialValues,
    loginSchema,
    login,
    error,
    loading,
  };
};
export default useLogin;
