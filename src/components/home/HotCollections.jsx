import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg"; // Author image
import nftImage from "../../images/nftImage.jpg"; // NFT image
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
//added a dynamic slider for the Hot collection, made it responsive, with buttons
//, and added the hot loading. Hoping that works

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]); // State to store the collections data

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width:400px)": {
        loop: false, // Disable Looping on screens larger than 500px
      },
    },
    slideChanged() {
      console.log("Slide changed");
    },
  });

  useEffect(() => {
    // Fetch the data from the API when the component mounts
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    )
      .then((response) => response.json()) // Assuming the API returns a JSON response
      .then((data) => setHotCollections(data)) // Set the data to state
      .catch((error) => console.error("Error fetching data: ", error)); // Handle errors
  }, []);

  useEffect(() => {
    // Ensure the slider is refreshed after data is loaded or after the collections state changes
    if (instanceRef.current && hotCollections.length > 0) {
      instanceRef.current.update(); // Update the slider to accommodate new items
    }
  }, [hotCollections, instanceRef]);

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
        </div>

        {/* Slider Container */}
        <div className="keen-slider-wrapper" style={{ position: "relative" }}>
          <div
            ref={sliderRef}
            className="keen-slider"
            style={{ display: "flex", overflow: "hidden" }}
          >
            {hotCollections.length > 0 ? (
              hotCollections.map((collection, index) => (
                <div
                  className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-12"
                  key={index}
                  style={{
                    flex: "0 0 auto", // Ensure that each item stays in the row without wrapping
                    margin: "0px", // Optional: Adds space between the items
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="nft_coll" style={{ padding: "0px", margin: "0px" }}>
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.image || nftImage}
                          className="lazy img-fluid"
                          alt={collection.name}
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage || AuthorImage}
                          alt={collection.author}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.name}</h4>
                      </Link>
                      <span>{collection.tokenId || "ERC-192"}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading collections...</p> // Show a loading message while data is being fetched
            )}
          </div>

          {/* Navigation Buttons */}
          <button
            className="keen-slider-prev"
            onClick={() => instanceRef.current?.prev()}
            style={{
              position: "absolute",
              top: "50%",
              left: "25px",
              transform: "translateY(-60%)",
              background: "rgba(0,0,0,0.5)",
              color: "black",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            &lt;
          </button>
          <button
            className="keen-slider-next"
            onClick={() => instanceRef.current?.next()}
            style={{
              position: "absolute",
              top: "50%",
              right: "0px",
              transform: "translateY(-80%)",
              background: "gray",
              color: "black",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
