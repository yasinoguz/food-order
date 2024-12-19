import React from "react";
import Image from "next/image";
import Title from "../ui/title";
import Slider from "react-slick";

function Courusel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    appenDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-52"></div>
    ),
  };

  return (
    <div className="h-[calc(100vh-88px)] relative overflow-hidden">
      {/* Arka plan resmi */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={"/images/hero-bg.jpg"}
          alt="background image"
          layout="fill"
          priority
          objectFit="cover"
          className="z-[-1]" // Arka planda kalacak
        />
      </div>

      <Slider {...settings}>
        {/* İlk slayt */}
        <div className="flex mt-56 justify-start items-center h-full text-white">
          <div className="ml-10">
            <Title addclas={"text-yellow-200 text-4xl mb-4"}>
              Fast Food Restaurant
            </Title>
            <p className="text-sm sm:w-2/5 w-full">
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <button className="btn-primary mt-4">Order Now</button>
          </div>
        </div>

        {/* İkinci slayt */}
        <div className="flex mt-56 justify-center items-center h-full text-white">
          <div className="ml-10">
            <Title addclas={"text-yellow-200 text-4xl mb-4"}>
              Delicious Food Awaits
            </Title>
            <p className="text-sm sm:w-2/5 w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="btn-primary mt-4">Check Menu</button>
          </div>
        </div>

        {/* Üçüncü slayt */}
        <div className="flex mt-56 justify-center items-center h-full text-white">
          <div className="ml-10">
            <Title addclas={"text-yellow-200 text-4xl mb-4"}>
              Fresh Ingredients
            </Title>
            <p className="text-sm sm:w-2/5 w-full">
              Experience the best quality food with fresh ingredients and
              amazing flavors.
            </p>
            <button className="btn-primary mt-4">Learn More</button>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Courusel;
