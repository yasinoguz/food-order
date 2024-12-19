import React from 'react'
import Title from '../../ui/title'
import CustomerItem from './customerItem'
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


function customer() {

    function NextBtn({ onClick }) {
        return (
            <button
                className="absolute -bottom-12 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white"
                onClick={onClick}
            >
                <IoIosArrowForward />
            </button>
        );
    }
    function PrevBtn({ onClick }) {
        return (
            <button
                className="absolute -bottom-12 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white mr-2"
                onClick={onClick}
            >
                <IoIosArrowBack />
            </button>
        );
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: true,
        nextArrow: <NextBtn />,
        prevArrow: <PrevBtn />,

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <div className="container mx-auto">
            <Title addclas="text-[40px] text-center">What Says Our Customers</Title>
            <div className=''>

                <Slider {...settings}>
                    <CustomerItem imgSrc="/images/client1.jpg" />
                    <CustomerItem imgSrc="/images/client2.jpg" />
                    <CustomerItem imgSrc="/images/client1.jpg" />
                    <CustomerItem imgSrc="/images/client2.jpg" />
                </Slider>


            </div>
        </div>
    )
}

export default customer