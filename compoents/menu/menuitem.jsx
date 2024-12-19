import React, { useState } from "react";
import Image from "next/image";
import Title from "../../ui/title";
import { RiShoppingCart2Fill } from "react-icons/ri";
import Link from "next/link";

function Menuitem({ product }) {
  return (
    <div className="bg-secondary rounded-3xl sm:gap-0 gap-3 ">
      <div className="w-full bg-[#f1f2f3] h-52 grid place-content-center rounded-bl-[40px] rounded-tr-2xl rounded-tl-2xl">
        <Link href={`/product/${product._id}`}>
          <div className="relative w-36 h-36 hover:scale-110 transition-all rounded-tr-3xl rounded-tl-3xl ">
            <Image src={product.img} alt="" layout="fill" priority />
          </div>
        </Link>
      </div>

      <div className="p-6 text-white">
        <h4 className="text-xl font-semibold">{product.title}</h4>
        <p className="text-[15px]">{product.desc}</p>

        <div className="flex justify-between p-6 mt-1">
          <span>${product.prices[0]}</span>
          <button className="btn-primary !p-0 !w-10 !h-10 rounded-full grid place-content-center">
            <RiShoppingCart2Fill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menuitem;
