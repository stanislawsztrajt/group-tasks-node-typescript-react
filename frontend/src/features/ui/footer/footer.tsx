import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="text-gray-600 bg-white mt-96 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap order-first text-center md:text-left">
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 title-font">
              Subpages
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a href="/auth/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </a>
              </li>
              <li>
                <a href="/auth/sign-up" className="text-gray-600 hover:text-gray-800">
                  Register
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-600 hover:text-gray-800">
                  Dashboard
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
