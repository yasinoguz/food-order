import React from "react";
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
import Title from "../../ui/title";

function Campaignitem() {
  return (
    <div className="flex-1 flex items-center gap-x-4 bg-secondary px-[15px] py-5 rounded-md ">
      <div className="relative md:w-44 md:h-44 w-36 h-36 border-primary border-[5px]  rounded-full overflow-hidden ">
        <Image
          src={"/images/o1.jpg"}
          alt=""
          layout="fill"
          objectFit="cover"
          priority
          className="hover:scale-105 transition-all"
        />
      </div>

      <div className="text-white">
        <Title addClass="text-2xl">Tasty Thursdays</Title>
        <div className="font-dancing my-1">
          <span className="text-[40px]">20%</span>
          <span className="text-sm inline-block ml-1">Off</span>
        </div>
        <button className="btn-primary flex items-center gap-x-2">
          Order Now <MdShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
}

function campaigns() {
  return (
    <div className="flex justify-between container mx-auto py-20 gap-6 flex-wrap ">
      <Campaignitem />
      <Campaignitem />
    </div>
  );
}

export default campaigns;
