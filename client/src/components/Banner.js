import React from "react";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Banner.css";
import myImage1 from '../pics/banner1.jpg';
import myImage2 from '../pics/banner2.jpg';
import myImage3 from '../pics/banner3.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Banner = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} pause={false} className="relative">
      <Carousel.Item>
        <img className="d-block w-100 fixed-height" src={myImage1} alt="First slide" />
        <Carousel.Caption className="caption rounded-2">
          <h3>YouDawi</h3>
          <p>We ensures the best  Doctors ,Find The Best Doctor Near By You</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 fixed-height" src={myImage2} alt="Second slide" />

        <Carousel.Caption className="caption">
          <h3>YouDawi</h3>
          <p>We ensures the best  Doctors ,Find The Best Doctor Near By You</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 fixed-height" src={myImage3} alt="Third slide" />

        <Carousel.Caption className="caption">
          <h3>YouDawi</h3>
          <p>We ensures the best  Doctors ,Find The Best Doctor Near By You</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;