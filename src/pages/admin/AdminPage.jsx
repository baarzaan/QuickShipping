import React, { Suspense } from "react";
import { useAuth } from "../../context/AuthContext";
import SideBar from "../../components/admin/SideBar";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiUsersThree } from "react-icons/pi";
import { GoStar } from "react-icons/go";
import { GiProfit } from "react-icons/gi";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <>
          {user.isAdmin ? (
            <div className="grid grid-cols-4 gap-5 w-full h-screen">
              <SideBar />

              <div className="col-span-3 p-2 w-full">
                <div className="flex flex-col justify-center items-center gap-5 w-full p-3">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-2xl font-semibold">
                      Welcome back, <strong>{user.fullName}</strong>
                    </h2>

                    <div className="flex justify-center items-center gap-2">
                      <h3 className="text-lg font-bold">{user.fullName}</h3>

                      <Suspense fallback={<>Loading...</>}>
                        <img
                          src={user.userImageURL}
                          className="w-12 h-12 object-cover rounded-full"
                          alt=""
                        />
                      </Suspense>
                    </div>
                  </div>

                  <div className="flex justify-center items-center w-full h-[150px] overflow-x-auto bg-gray-100 rounded-md">
                    <div className="w-full flex flex-col justify-center items-center gap-2 bg-gray-300 h-full rounded-tl-md rounded-bl-md">
                      <div className="flex justify-center items-center gap-1">
                        <HiOutlineShoppingBag
                          size={20}
                          className="bg-[#969393]/50 rounded-full w-8 h-8 p-1"
                        />
                        <h3 className="text-xl font-semibold">Total sales</h3>
                      </div>
                      <strong className="text-lg">20,000$</strong>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center gap-2 h-full border-r border-r-[#969393]/50">
                      <div className="flex justify-center items-center gap-1">
                        <PiUsersThree
                          size={20}
                          className="bg-[#969393]/50 rounded-full w-8 h-8 p-1"
                        />
                        <h3 className="text-xl font-semibold">Users</h3>
                      </div>
                      <strong className="text-lg">16,000</strong>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center gap-2 h-full border-r border-r-[#969393]/50">
                      <div className="flex justify-center items-center gap-1">
                        <GoStar
                          size={20}
                          className="bg-[#969393]/50 rounded-full w-8 h-8 p-1"
                        />
                        <h3 className="text-xl font-semibold">Total orders</h3>
                      </div>
                      <strong className="text-lg">470,656</strong>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center gap-2 h-full">
                      <div className="flex justify-center items-center gap-1">
                        <GiProfit
                          size={20}
                          className="bg-[#969393]/50 rounded-full w-8 h-8 p-1"
                        />
                        <h3 className="text-xl font-semibold">Profit</h3>
                      </div>
                      <strong className="text-lg">15,500$</strong>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center w-full gap-3">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-xl font-semibold">Last orders</h2>

                      <Link
                        to="/admin/orders"
                        className="text-blue-600 hover:text-blue-800 transform transition-all duration-100 ease-in-out active:scale-95"
                      >
                        See All
                      </Link>
                    </div>

                    <table className="w-full text-left bg-[#f9f9f9] rounded-md">
                      <tr className="w-full border-b border-b-[#969393]/25">
                        <td>Name</td>
                        <td>Id</td>
                        <td>Price</td>
                        <td>Time</td>
                      </tr>

                      <tr className="w-full border-b border-b-[#969393]/25 last:border-none p-1">
                        <td>Men clothes</td>
                        <td>asljdmkljLmsjnd1087370qkmxli</td>
                        <td>15,000 IQD</td>
                        <td>2h ago</td>
                      </tr>

                      <tr className="w-full border-b border-b-[#969393]/25 last:border-none p-1">
                        <td>Men clothes</td>
                        <td>asljdmkljLmsjnd1087370qkmxli</td>
                        <td>15,000 IQD</td>
                        <td>2h ago</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>404</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default AdminPage;
