import React, { FC } from "react";

const Header: FC = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500">
            <div className="container flex items-center justify-between px-4 mx-auto">
              <div className="relative flex justify-between w-full px-4 lg:w-auto lg:static lg:block lg:justify-start">
                <a
                  className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed text-white uppercase whitespace-nowrap"
                  href="/"
                >
                  GroupsTasks
                </a>
              </div>
              <div
              >
                <ul className="flex flex-row list-none lg:ml-auto">
                  <li className="nav-item">
                    <a
                      className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                      href="/dashboard"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                      href="/auth/login"
                    >
                      Login
                    </a>
                    
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
