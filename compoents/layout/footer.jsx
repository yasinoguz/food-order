import React from "react";
import Title from "../../ui/title";
import { IoLocation } from "react-icons/io5";
import {
  FaPhoneAlt,
  FaTwitter,
  FaFacebook,
  FaInstagramSquare,
  FaDiscord,
} from "react-icons/fa";
import * as Icons from "react-icons/fa";

import { IoIosMail } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";

function footer() {
  const [footer, setFooter] = useState([]);
  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooter(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getFooter();
  }, []);

  return (
    <div className="bg-secondary text-white mt-16">
      <div className="container mx-auto pt-14 pb-14">
        <div className="flex gap-3 flex-wrap  md:justify-between justify-center text-center">
          <div className="md:flex-1 ">
            <Title addclas="text-[24px]">CONTACT US</Title>
            <a href={footer?.location} className="mt-2">
              <i className="inline-block mr-1">
                <IoLocation />
              </i>
              <span className="inline">Location</span>
            </a>
            <div className="mt-2">
              <i className="inline-block mr-1">
                <FaPhoneAlt />{" "}
              </i>
              <span className="inline">Call {footer?.phoneNumber}</span>
            </div>
            <a href={`mailto:${footer?.email}`}>
              <i className="inline-block mr-1">
                <IoIosMail />{" "}
              </i>
              <span className="inline">demo@gmail.com</span>
            </a>
          </div>

          <div className="md:flex-1 gap-2">
            <Title addClass="text-[38px]">Feane</Title>
            <p className="mt-3">{footer?.desc}</p>
            <div className="flex justify-center gap-2">
              {" "}
              {/* Burada flex ve gap tanımlandı */}
              {footer?.socialMedia?.map((item) => {
                const IconComponent = Icons[item.icon]; // String'den bileşen bulma
                return (
                  <a
                    href={item?.link}
                    className="w-8 h-8 grid place-content-center mt-3 bg-white text-secondary rounded-full hover:text-white hover:bg-primary"
                    key={item._id}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {IconComponent ? <IconComponent /> : null}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:flex-1  ">
            <Title addClass="text-[24px]">Opening Hours</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <span className="inline-block ml-2">
                  {footer?.openingHours?.day}
                </span>
              </div>
              <div>
                <span className="inline-block ml-2">
                  {footer?.openingHours?.hour}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default footer;
