import React, { useEffect, useState } from "react";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg"; // Default background image
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {
  // State to hold screen width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function
      once: true, // Animation happens only once
      mirror: false, // Disable mirror effect
    });

    // Event listener to handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate background size and position dynamically
  let backgroundSize = "200%"; // Default background size for larger screens
  let backgroundPosition = "center center"; // Default position

  if (windowWidth <= 768) {
    backgroundSize = "200%"; // Adjust background size for small screens (mobile)
    backgroundPosition = "center center"; // Keep it centered for mobile
  } else if (windowWidth <= 1240) {
    backgroundSize = "200%"; // Adjust for tablets (between 576px and 768px)
    backgroundPosition = "center top"; // Slightly adjust position for tablets
  } else if (windowWidth <= 1500) {
    backgroundSize = "250%"; // Slightly larger for tablets and medium screens
    backgroundPosition = "center center"; // Keep it centered
  }else if(windowWidth <=1600){
    backgroundSize = "250%";
    backgroundPosition = "center center";
  }
   else {
    backgroundSize = "200%"; // For large screens, background zooms in
    backgroundPosition = "center center"; // Center the image on larger screens
  }

  return (
    <section
      id="section-hero"
      aria-label="section"
      className=" no-top no-bottom vh-100"
      style={{
        background: `url(${backgroundImage}) bottom / cover`,
        backgroundSize: backgroundSize,
        backgroundPosition: backgroundPosition,
        backgroundRepeat: "no-repeat",
        transition: "background-size 0.5s ease-out, background-position 0.5s ease-out", 
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
      <style>{`
        /* Media Query for Tablets */
        @media (max-width: 992px) {
          #section-hero {
            background-size: cover !important; /* Adjust background for tablets */
            background-position: center center;
          }
        }

        /* Media Query for Small Devices */
        @media (max-width: 768px) {
          #section-hero {
            background-size: cover !important;
            background-position: center center;
          }
        }

        /* Media Query for Large Screens */
        @media (min-width: 1600px) {
          #section-hero {
            background-size: cover !important; /* Ensure full coverage on large screens */
            background-position: center center;
          }
        }
      `}</style>


    </section>
  );
};

export default Landing;
