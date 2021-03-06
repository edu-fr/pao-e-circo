import React, { useState } from "react";
import { SliderData } from "../SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./styles.css";
import { Link } from "react-router-dom";

const ImageSliderAnuncio = ({ slides }: any) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div className="sliderContainer" key={index}>
            <div className={index === current ? "slide active" : "slide"}>
              {index === current && (
                  <img src={slide} className="image" />
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ImageSliderAnuncio;
