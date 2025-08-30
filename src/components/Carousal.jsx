import React, {  useEffect } from "react";
import {getData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";

const Carousal = () => {
  const { data, fetchAllProduct } = getData()
  useEffect(() => {
    fetchAllProduct();
  }, []);

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`} style={{ zIndex: 3 }}>
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            pauseOnHover: false,
            padding: "2px",
            left: "50px",
          }}
        />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
        />
      </div>
    );
  };

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
    <div>
      <Slider {...settings}>
        {Array.isArray(data) &&
          data.slice(0, 7).map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
            >
              <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center my-20 md:my-0 px-4">
                <div className="md:space-y-6 space-y-3">
                  <h3 className="text-red-500 font-semibold font-sans text-sm">
                    Powering your World with the Best in Electronics
                  </h3>
                  <h1 className="uppercase line-clamp-2 md:line-clamp-3 text-xl md:text-4xl font-bold md:w-[500px] text-white">
                    {item.title}
                  </h1>
                  <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                    {item.description}
                  </p>
                  <button
                    className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3
                   py-2 rounded-md cursor-pointer mt-2"
                  >
                    Shop Now
                  </button>
                </div>
        
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400"
                />
              </div>
            </div>
          ))}
      </Slider>
      <Category/>
    </div>
  );
};

export default Carousal;
