import React from "react";
import ClickOutHandler from "react-clickout-handler";
import Title from "../ui/title";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../compoents/Input";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";

function search({ setmodal }) {
  const [products, setproducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getprodct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product`
        );
        setproducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    setTimeout(() => {
      getprodct();
    }, 3000);
  }, []);
  const handleSearch = (e) => {
    const searchFilter = products
      .filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5);
    setFiltered(searchFilter);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <ClickOutHandler onClickOut={() => setmodal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-5">
            <Title addclas="text-[40px] text-center">Search</Title>
            <Input placeholder="Search..." onChange={handleSearch} />
            <div>
              {products.length > 0 ? (
                <ul className="mt-4">
                  {filtered.length > 0 ? (
                    filtered.map((product) => (
                      <li
                        className="flex items-center justify-between p-1 hover:bg-primary transition-all px-2 cursor-pointer"
                        key={product._id}
                        onClick={() => {
                          router.push(`/product/${product?._id}`);
                          setmodal(false);
                        }}
                      >
                        <div className="relative flex">
                          <Image
                            src={product?.img}
                            alt={product?.title}
                            width={48}
                            height={48}
                          />
                        </div>
                        <span className="font-bold">{product?.title}</span>
                        <span className="font-bold">${product.prices[0]}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-center font-semibold">
                      No results found!
                    </p>
                  )}
                </ul>
              ) : (
                <div className="flex justify-center items-center mt-3">
                  <PacmanLoader color="#fca311" />
                </div>
              )}
              <button
                className="absolute top-10 right-5"
                onClick={() => setmodal(false)}
              >
                <MdOutlineCancel size={25} className="  transition-all " />
              </button>
            </div>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default search;
