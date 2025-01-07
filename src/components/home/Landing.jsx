import React, { useEffect, useState } from "react";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function
      once: true, // Animation happens only once
      mirror: false, // Disable mirror effect
    });
  }, []);

  return (
    <section
      id="section-hero"
      aria-label="section"
      className="no-top no-bottom vh-100"
      style={{
        background: `url(${backgroundImage}) bottom / cover`,
        backgroundSize: "120%",
        transition: "background-size 0.5s ease-out", // Optional background zoom
      }}
    >
      <div className="v-center">
        <div className="container">
          <div className="row align-items-center">
            <div data-aos="fade-up" className="col-12 col-md-6">
              <div className="spacer-single"></div>
              <h6>
                <span data-aos="fade-up" className="text-uppercase id-color-2">Ultraverse Market</span>
              </h6>
              <div className="spacer-10"></div>
              <h1 data-aos="fade-up">Create, sell or collect digital items.</h1>
              <p data-aos="fade-up" className="lead">
                Unit of data stored on a digital ledger, called a blockchain,
                that certifies a digital asset to be unique and therefore not
                interchangeable.
              </p>
              <div className="spacer-10"></div>
              <Link data-aos="fade-up" className="btn-main lead" to="/explore">
                Explore
              </Link>
              <div className="mb-sm-30"></div>
            </div>

            {/* NFT Image with Fade-In and Optional Zoom */}
            <div className="col-12 col-md-6 xs-hide">
              <img
                src={NFT}
                alt="NFT"
                className="lazy img-fluid"
                data-aos="zoom-in"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
