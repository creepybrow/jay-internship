import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

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
  });

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => response.json())
      .then((data) => setHotCollections(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    if (instanceRef.current && hotCollections.length > 0) {
      instanceRef.current.update();
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
          <div className="keen-slider-wrapper row" style={{ position: "relative" }}>
            <div
              ref={sliderRef}
              className="keen-slider"
              style={{ display: "flex", overflow: "hidden" }}
            >
              {hotCollections.length > 0 ? (
                hotCollections.map((collection) => (
                  <div className="keen-slider__slide" key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage || nftImage}
                            className="lazy img-fluid"
                            alt={collection.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "15px",
                              objectFit: "cover",
                            }}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={AuthorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.name}</h4>
                        </Link>
                        <span>{collection.tokenId || "No Token ID"}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading collections...</p>
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
                background: "rgba(0, 0, 0, 0.5)",
                width:"30px",
                height:"40px",
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
                right: "0px",
                transform: "translateY(-50%)",
                background: "black",
                color: "white",
                width:"40px",
                border: "none",
                padding: "20px",
                borderRadius:"25%",
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
