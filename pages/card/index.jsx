import React from "react";
import Footer from "../../compoents/layout/footer";
import Header from "../../compoents/layout/Header";
import Image from "next/image";
import Title from "../../ui/title";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cardslice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function Index({ userList }) {
  const cart = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const user = userList?.find((user) => user.email === session?.user?.email);
  const router = useRouter();

  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "No address",
    total: cart.total,
    method: 0,
  };

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure to order?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );
          console.log("res stat=" + res.status);

          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
          }
        }
      } else {
        toast.error("Please login first.", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />

      <div className="min-h-[calc(100vh-408px)]">
        <div className="flex justify-between sm:flex-row flex-col">
          <div className='-ml-10 md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full"'>
            <div className="max-h-52 overflow-auto">
              <table className="w-full text-sm text-center text-gray-500 min-w-[1000px] ">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      PRODUCT
                    </th>
                    <th scope="col" className="py-3 px-6">
                      EXTRAS
                    </th>
                    <th scope="col" className="py-3 px-6">
                      PRİCE
                    </th>
                    <th scope="col" className="py-3 px-6">
                      QUANTİTY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product, index) => (
                    <tr
                      className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                      key={index}
                    >
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                        <Image
                          src={product?.img}
                          alt=""
                          width={50}
                          height={50}
                        />
                        <span>{product.name}</span>
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.extras.map((item) => (
                          <span key={item.id}>{item.text}, </span>
                        ))}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        ${product.price}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-secondary md:w-auto w-full   md:text-start !text-center sm:absolute block right-0 top-[86px] min-h-[calc(100vh-308px)] flex flex-col justify-center text-white p-12">
            <Title addClass="text-[40px]">CART TOTAL</Title>
            <div className="mt-6">
              <b>Subtotal: </b>${cart.total} <br />
              <b className=" inline-block my-1">Discount: </b>$0.00 <br />
              <b>Total: </b>${cart.total}
            </div>
            <button className="btn-primary mt-4" onClick={createOrder}>
              CHECKOUT NOW!
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Index;
