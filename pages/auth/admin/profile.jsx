import React from "react";
import Order from "../../../compoents/admin/order";
import Footer from "../../../compoents/layout/footer";
import Image from "next/image";
import { useState } from "react";
import Header from "../../../compoents/layout/Header";
import { FaKey } from "react-icons/fa";
import { IoIosBasket, IoMdExit } from "react-icons/io";
import { CiForkAndKnife } from "react-icons/ci";
import { PiBicycleThin } from "react-icons/pi";
import Product from "../../../compoents/admin/product";
import Category from "../../../compoents/admin/Category";
import Foote from "../../../compoents/admin/footer";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import AddProduct from "../../../compoents/admin/addproduct";

function Profile() {
  const [tabs, setTabs] = useState(0);
  const [IsProductModal, setIsProductModal] = useState(false);
  const { push } = useRouter();

  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("http://localhost:3000/auth/admin");
          toast.success("Admin Account Closed!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />

      <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col">
        <div className="  border border-b-0 flex-shrink-0 lg:w-80 w-full">
          <div className="relative flex flex-col items-center p-4">
            <Image
              src={"/images/admin.png"}
              alt=""
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-semibold text-2xl mt-1">admin</span>
          </div>

          <div className="">
            <ul className="font-semibold">
              <li
                className={`border flex w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                  tabs === 0 && "bg-primary text-white"
                }`}
                onClick={() => setTabs(0)}
              >
                <i className="mt-1 ml-2 mr-2">
                  <CiForkAndKnife />
                </i>
                <button>Products</button>
              </li>
              <li
                className={`w-full flex border p-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                  tabs === 1 && "bg-primary text-white"
                }`}
                onClick={() => setTabs(1)}
              >
                <i className="mt-1 ml-2 mr-2">
                  <IoIosBasket />
                </i>
                <button>Orders</button>
              </li>
              <li
                className={`w-full flex border p-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                  tabs === 2 && "bg-primary text-white"
                }`}
                onClick={() => setTabs(2)}
              >
                <i className="mt-1 ml-2 mr-2">
                  <FaKey />
                </i>
                <button>Catagories</button>
              </li>
              <li
                className={`w-full flex border p-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                  tabs === 3 && "bg-primary text-white"
                }`}
                onClick={() => setTabs(3)}
              >
                <i className="mt-1 ml-2 mr-2">
                  <PiBicycleThin />
                </i>
                <button>Footer</button>
              </li>
              <li
                className={`w-full flex border p-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                  tabs === 4 && "bg-primary text-white"
                }`}
                onClick={closeAdminAccount}
              >
                <i className="mt-1 ml-2 mr-2">
                  <IoMdExit />
                </i>
                <button>Exit</button>
              </li>
            </ul>
          </div>
        </div>

        {tabs == 0 && <Product />}

        {tabs == 1 && <Order />}

        {tabs == 2 && <Category />}
        {tabs == 3 && <Foote />}
        {IsProductModal && <AddProduct setIsProductModal={setIsProductModal} />}
        <button
          className="btn-primary !w-12 !h-12 !p-0 absolute bottom-20 right-10 text-4xl"
          onClick={() => setIsProductModal(true)}
        >
          +
        </button>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps = (ctx) => {
  // hazır bır foksyon bu  ctx contex verılerı hazır olarak gecılıyor sısteme
  console.log("ctxxx= " + ctx);

  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/auth/admin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Profile;
