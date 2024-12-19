import React from "react";
import Courusel from "../../ui/courusel";
import Campaigns from "../../compoents/layout/campaigns";
import Menuwrapper from "../../compoents/menu/menuwrapper";
import About from "../../pages/about";
import Reservation from "../../compoents/Reservation";
import Customer from "../../compoents/customer/customer";
import Image from "next/image";
import Footer from "../../compoents/layout/footer";
function index({ categoryList, productList }) {
  console.log("bunlar categori" + categoryList);

  return (
    <div>
      <Courusel />
      <Campaigns />
      <Menuwrapper categoryList={categoryList} productList={productList} />
      <About />
      <Reservation />
      <Customer />
      <Footer />
    </div>
  );
}

export default index;
