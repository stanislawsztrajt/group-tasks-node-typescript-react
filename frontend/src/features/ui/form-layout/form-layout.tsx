import React, { ReactNode } from "react";
import type { FCC } from "types/index";

interface Props {
  children: ReactNode;
}

const FormLayou: FCC<Props> = ({ children }: Props) => {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="h-full gradient-form md:h-screen">
        <div className="container h-full px-6 py-12">
          <div className="flex flex-wrap items-center justify-center h-full text-gray-800 g-6">
            <div className="xl:w-10/12">
              <div className="block bg-white rounded-lg shadow-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="px-4 lg:w-6/12 md:px-0">
                    <div className="md:p-12 md:mx-6">{children}</div>
                  </div>
                  <div className="flex items-center bg-blue-500 rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                    <div className="px-4 py-6 text-white md:p-12 md:mx-6">
                      {/* <img src={UndrawBrainstorming} className="" alt="" /> */}
                      <div className="mt-4">
                        <h4 className="mb-6 text-xl font-semibold px-28">
                          Group tasks! login
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormLayou;
