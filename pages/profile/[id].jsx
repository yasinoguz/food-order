import React, { useState, useEffect } from "react";
import Footer from "../../compoents/layout/footer";
import Header from "../../compoents/layout/Header";
import Image from "next/image";
import { MdHome } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { IoIosBasket, IoMdExit } from "react-icons/io";
import Account from "../../compoents/account";
import Password from "../../compoents/Password";
import Order from "../../compoents/Order";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

function Index({ user }) {
  const [tabs, setTabs] = useState(0);
  const { push } = useRouter();
  const { data: session } = useSession();

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ redirect: false });
      push("/auth");
    }
  };

  return (
    <div>
      <Header />

      <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col">
        <div className="  border border-b-0 flex-shrink-0 lg:w-80 w-full">
          <div className="relative flex flex-col items-center p-4">
            <Image
              src={"/images/client2.jpg"}
              alt=""
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-semibold text-2xl mt-1">{user.fullName}</span>
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
                  <MdHome />
                </i>
                <button>Account</button>
              </li>
              <li
                className={`w-full flex border p-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                  tabs === 1 && "bg-primary text-white"
                }`}
                onClick={() => setTabs(1)}
              >
                <i className="mt-1 ml-2 mr-2">
                  <FaKey />
                </i>
                <button>Password</button>
              </li>
              <li
                className={`w-full flex border p-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                  tabs === 2 && "bg-primary text-white"
                }`}
                onClick={() => setTabs(2)}
              >
                <i className="mt-1 ml-2 mr-2">
                  <IoIosBasket />
                </i>
                <button>Orders</button>
              </li>
              <li
                className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
                onClick={handleSignOut}
              >
                <i className="mt-1 ml-2 mr-2">
                  <IoMdExit />
                </i>
                <button>Exit</button>
              </li>
            </ul>
          </div>
        </div>

        {tabs === 0 && <Account user={user} />}
        {tabs === 1 && <Password user={user} />}

        {tabs == 2 && <Order />}
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req, params }) {
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
  );

  return {
    props: {
      user: user ? user.data : null,
    },
  };
}

export default Index;
