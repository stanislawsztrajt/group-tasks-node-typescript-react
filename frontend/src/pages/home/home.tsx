import React, { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-5/6">
        <div className="px-40 text-center bg-white rounded-md shadow-lg py-28">
          <h1 className="font-thin text-7xl">Welcome!</h1>
          <div className="flex flex-col items-center justify-center mt-8 text-lg font-medium">
            <span>
              Sign up or login if you have already account!
              <br />
              GROUPSTASKS
            </span>
            <div className="flex flex-row items-end justify-start w-full">
              <Link
                to="/auth/login"
                className="w-1/2 p-2 mt-4 mr-2 text-white duration-100 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/auth/sign-up"
                className="w-1/2 p-2 mt-2 ml-2 text-white duration-100 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
