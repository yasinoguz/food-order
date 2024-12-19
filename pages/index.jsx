import Home from "../pages/home";
import Header from "../compoents/layout/Header.jsx";
import Input from "../compoents/Input.jsx";
import axios from "axios";
export default function index({ categoryList, productList }) {
  return (
    <div>
      <Header />
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  return {
    props: {
      categoryList: res.data ? res.data : [],
      productList: product.data ? product.data : [],
    },
  };
};
