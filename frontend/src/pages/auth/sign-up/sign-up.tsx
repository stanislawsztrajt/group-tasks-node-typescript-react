import React, { FC } from "react";
// import UndrawNature from "src/images/undraw_nature.svg";
import { Field, Form, Formik } from "formik";
import useSignUp from "./use-sign-up";
import { Loading } from "features/ui";
// import { checkIsUserLoggedIn } from "src/helpers";
import { Link } from "react-router-dom";

const SignUp: FC = () => {
  // checkIsUserLoggedIn();
  const { initialValues, signUpSchema, signUp, error, loading } = useSignUp();

  return (
    <>
      <Link to={"/"}>
        <div className="text-center">
          {/* <img className="mx-auto w-36" src={UndrawNature} alt="logo" /> */}

          <h4 className="pb-1 mt-1 mb-12 text-xl font-semibold">
            Chill and think
          </h4>
        </div>
      </Link>

      {loading ? (
        <div className="p-16 px-24 lg:py-32 lg:px-52">
          <Loading />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={signUp}
        >
          {({ errors, touched }) => (
            <>
              <Form>
                <p className="mb-4">Please sign up to your account</p>
                <div className="mb-4">
                  {error && (
                    <div className="text-sm font-thin text-red-500">
                      {error}
                    </div>
                  )}
                  <Field
                    type="name"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="name"
                    name="name"
                  />
                  {errors.name && touched.name && (
                    <div className="text-sm font-thin text-red-500">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <Field
                    type="email"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="email"
                    name="email"
                  />
                  {errors.email && touched.email && (
                    <div className="text-sm font-thin text-red-500">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <Field
                    type="password"
                    name="password"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="password"
                  />
                  {errors.password && touched.password && (
                    <div className="text-sm font-thin text-red-500">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <Field
                    type="password"
                    name="repeatedPassword"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="repeat password"
                  />
                  {errors.repeatedPassword && touched.repeatedPassword && (
                    <div className="text-sm font-thin text-red-500">
                      {errors.repeatedPassword}
                    </div>
                  )}
                </div>
                <div className="pt-1 pb-1 mb-12 text-center">
                  <button
                    className="inline-block px-6 py-2.5 text-blue-500 hover:text-white border border-blue-500 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                    type="submit"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Sign up
                  </button>

                  <Link
                    to={"/login"}
                    className="inline-block px-6 py-2.5 text-blue-500 hover:opacity-90 text-sm transition duration-150 ease-in-out w-full mb-3"
                  >
                    Have an account? Login
                  </Link>
                  <Link
                    to={"/"}
                    className="inline-block px-6 py-2.5 text-blue-500 hover:opacity-90 text-sm transition duration-150 ease-in-out w-full mb-3"
                  >
                    Go to home page to find out more
                  </Link>
                </div>
              </Form>
            </>
          )}
        </Formik>
      )}
    </>
  );
};

export default SignUp;
