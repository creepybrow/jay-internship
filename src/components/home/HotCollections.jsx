import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import Slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import Slick Theme CSS
import nftImage from "../../images/nftImage.jpg"; // Assuming you have a local fallback image

export default function HotCollections() {
  const [hotCollections, setHotCollections] = useState([]); // State to store the collections data
  const sliderRef = useRef(null); // Ref to access Slider methods

  // Fetch data from the API
  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data:", data); // Log the fetched data
        setHotCollections(data); // Set the data to state
      })
      .catch((error) => console.error("Error fetching data: ", error)); // Handle errors
  }, []);

  // Slider settings for React Slick
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true, // Loop the carousel
    speed: 500, // Transition speed
    slidesToShow: 4, // Show 4 items at a time
    slidesToScroll: 1, // Scroll 1 item at a time
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Handle next and prev actions for custom arrows
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); // Call slickPrev method to go to the previous slide
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext(); // Call slickNext method to go to the next slide
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", position: "relative" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Hot Collections</h2>

      {/* Custom Previous Arrow */}
      <div
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: "-50px",
          top: "50%",
          transform: "translate(0, -50%)", // Center the arrow vertically
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Darker background for contrast
          color: "white", // White arrow color for contrast
          fontSize: "30px", // Increase the size of the arrows
          padding: "10px",
          borderRadius: "50%", // Circular button
          cursor: "pointer",
          zIndex: 10, // Ensure the arrow stays above other elements
        }}
      >
        ←
      </div>

      {/* Custom Next Arrow */}
      <div
        onClick={handleNext}
        style={{
          position: "absolute",
          right: "-50px",
          top: "50%",
          transform: "translate(0, -50%)", // Center the arrow vertically
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Darker background for contrast
          color: "white", // White arrow color for contrast
          fontSize: "30px", // Increase the size of the arrows
          padding: "10px",
          borderRadius: "50%", // Circular button
          cursor: "pointer",
          zIndex: 10, // Ensure the arrow stays above other elements
        }}
      >
        →
      </div>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {hotCollections.length > 0 ? (
          hotCollections.map((collection, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                marginRight: "15px", // Add a gap between slides
              }}
            >
              <div className="nft_coll_wrap" style={{ width: "100%", height: "auto" }}>
                <img
                  src={collection.image || nftImage} // Fallback image if no image is available
                  alt={collection.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    objectFit: "cover", // Ensures the image covers the container
                    marginBottom: "20px", // Optional: adds space between image and text
                  }}
                />
              </div>
              <div className="nft_coll_info" style={{ textAlign: "center", marginTop: "10px" }}>
                <h4 style={{ fontSize: "18px", color: "#333" }}>{collection.name}</h4>
                <span style={{ fontSize: "14px", color: "#777" }}>
                  {/* Dynamically display the token ID */}
                  Token ID: {collection.tokenId || "N/A"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>Loading collections...</p> // Display loading message while fetching data
        )}
      </Slider>
    </div>
  );
}
