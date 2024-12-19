import React from "react";
import Footer from "../../compoents/layout/footer";
import Header from "../../compoents/layout/Header";
import Menuwrapper from "../../compoents/menu/menuwrapper";
import axios from "axios";

function index({ categoryList, productList }) {
  return (
    <div>
      <Header />
      <div className="mt-10">
        <Menuwrapper categoryList={categoryList} productList={productList} />
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const category = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};

export default index;
