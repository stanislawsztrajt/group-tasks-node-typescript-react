import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";

import useLogin from "./use-login";

import { Loading } from "features/ui";

const Login: FC = () => {
  const { initialValues, loginSchema, login, error, loading } = useLogin();

  return (
    <>
      <Link to={"/"}>
        <div className="text-center">
          <h4 className="pb-1 mt-1 mb-12 text-xl font-semibold uppercase">GROUPSTASKS</h4>
        </div>
      </Link>
      {loading ? (
        <div className="p-8 px-24 lg:py-16 lg:px-40">
          <Loading />
        </div>
      ) : (
        <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={login}>
          <Form>
            <p className="mb-4">Please login to your account</p>
            <div className="mb-4">
              {error && <div className="text-sm font-thin text-red-500">{error}</div>}
              <Field
                type="email"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="password"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div className="pt-1 pb-1 mb-12 text-center">
              <button
                className="inline-block px-6 py-2.5 text-blue-500 hover:text-white border border-blue-500 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Log in
              </button>
              <Link
                to={"/auth/sign-up"}
                className="inline-block px-6 py-2.5 text-blue-500 hover:opacity-90 text-sm transition duration-150 ease-in-out w-full mb-3"
              >
                Don&apos;t have an account? create one
              </Link>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default Login;
