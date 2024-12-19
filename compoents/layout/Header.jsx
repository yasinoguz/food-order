import React, { useState } from "react";
import Logo from "../../ui/Logo";
import { CgProfile } from "react-icons/cg";
import { BsBasketFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Search from "../../ui/search";

function Header() {
  const router = useRouter();

  const [ismodal, setmodal] = useState(false);
  const [ishamburger, sethamburger] = useState(false);
  const cart = useSelector((state) => state.card);
  return (
    <div className="h-[5.4rem] bg-secondary ">
      <div className="container  text-white mx-auto flex justify-between items-center h-full">
        <div>
          <Logo />
        </div>
        <nav
          className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-full sm:text-white text-black sm:bg-transparent
       bg-white sm:flex hidden ${
         ishamburger === true && "!grid place-content-center z-50"
       }`}
        >
          <ul className="flex sm:flex-row flex-col  gap-x-2">
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/" && "text-primary"
              }`}
              onClick={() => setmodal(false)}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/menu" && "text-primary"
              }`}
              onClick={() => setmodal(false)}
            >
              <Link href="/menu">Menu</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/about" && "text-primary"
              }`}
              onClick={() => setmodal(false)}
            >
              <Link href="/aboutt">About</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/reservation" && "text-primary"
              }`}
              onClick={() => setmodal(false)}
            >
              <Link href="/reservation">Book Table</Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-x-3 items-center">
          <Link className="text-2xl cursor-pointer " href="/auth">
            <CgProfile
              className={`hover:text-primary transition-all cursor-pointer ${
                (router.asPath.includes("profile") ||
                  router.asPath.includes("auth")) &&
                "text-primary"
              }`}
              size={18}
            />
          </Link>
          <Link className="text-2xl relative" href="/card">
            <BsBasketFill
              className={`hover:text-primary transition-all cursor-pointer ${
                router.asPath === "/card" && "text-primary"
              }`}
              size={18}
            />
            <span className="w-4 h-4 inline-block bg-primary text-sm grid place-content-center absolute top-[-6px] right-[-6px] rounded-full text-black">
              {" "}
              {cart.products.length === 0 ? "0" : cart.products.length}
            </span>
          </Link>
          <button onClick={() => setmodal(true)} className="text-2xl" href="">
            <IoSearchSharp />
          </button>
          <a href="">
            <button className="btn-primary  md:inline-block hidden">
              Order Online
            </button>
          </a>

          <button
            className="sm:hidden block absolute top-8 right-4"
            onClick={() => sethamburger(true)}
          >
            <GiHamburgerMenu className="text-2xl hover:text-primary cursor-pointer" />
          </button>
        </div>
      </div>
      {ishamburger && (
        <button
          className="absolute  top-4 right-4 z-50"
          onClick={() => sethamburger(false)}
        >
          <MdOutlineCancel size={25} className=" transition-all" />
        </button>
      )}

      {ismodal ? <Search setmodal={setmodal} /> : <p></p>}
    </div>
  );
}

export default Header;
