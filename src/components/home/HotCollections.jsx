import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Initialize Keen-Slider with the responsive breakpoints and options
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width: 1200px)": {
        slides: 4,
      },
      "(min-width: 768px)": {
        slides: 3,
      },
      "(min-width: 400px)": {
        slides: 2,
      },
      "(max-width: 400px)": {
        slides: 1,
      },
    },
    slidesPerView: "auto", // Automatically adjusts slides per view
    spacing: 15, // Add spacing between slides if desired
  });

  // Fetch hot collections data on component mount
  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    )
      .then((response) => response.json())
      .then((data) => {
        setHotCollections(data); // Update state with fetched data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(error); // Handle any errors
        setLoading(false); // Set loading to false even on error
        console.error("Error fetching data: ", error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Update the Keen-Slider instance when hotCollections is updated
  useEffect(() => {
    if (instanceRef.current && hotCollections.length > 0) {
      instanceRef.current.update();
    }
  }, [hotCollections, instanceRef]);

  // Render a loading message or error if applicable
  if (loading) {
    return <p>Loading collections...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="keen-slider-wrapper" style={{ position: "relative" }}>
            <div ref={sliderRef} className="keen-slider">
              {hotCollections.length > 0 ? (
                hotCollections.map((collection) => (
                  <div className="keen-slider__slide" key={collection.id}>
                    <div className="nft_coll">
                      <div
                        className="nft_wrap"
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                        }}
                      >
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage || nftImage}
                            className="lazy img-fluid"
                            alt={collection.name}
                            style={{
                              width: "40%", // Use 100% width to take full container width
                              height: "auto", // Maintain aspect ratio
                              objectFit: "cover", // Ensure the image fills the area
                              borderRadius: "25px",
                            }}
                          />
                        </Link>
                      </div>
                      <div
                        className="nft_coll_pp"
                        style={{
                          width: "10%",
                          height: "150px",
                          position: "relative",
                          right: "0",
                        }}
                      >
                        <Link to="/author">
                          <img
                          
                            className="lazy pp-coll"
                            src={AuthorImage}
                            alt="Author"
                            style={{ width: "100%", height: "auto",
                              position:"relative",
                             }}
                          />
                          
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div
                        className="nft_coll_info"
                        style={{ position: "relative", right: "20%" }}
                      >
                        <Link to="/explore">
                          <h4>{collection.name}</h4>
                        </Link>
                        <span>{collection.tokenId}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No collections available.</p>
              )}
            </div>

            {/* Left Arrow */}
            <button
              className="keen-slider-prev"
              onClick={() => instanceRef.current?.prev()}
              style={{
                position: "absolute",
                top: "50%",
                left: "-20px",
                transform: "translateY(-50%)",
                background: "black",
                borderRadius: "25%",
                width: "50px",
                height: "100px",
                color: "white",
                border: "none",
                padding: "20px",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              ←
            </button>

            {/* Right Arrow */}
            <button
              className="keen-slider-next"
              onClick={() => instanceRef.current?.next()}
              style={{
                position: "absolute",
                top: "50%",
                right: "-40px",
                transform: "translateY(-50%)",
                background: "black",
                color: "white",
                width: "50px",
                border: "none",
                padding: "30px",
                borderRadius: "25%",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
