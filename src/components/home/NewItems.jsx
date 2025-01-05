import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

const ItemDetails = () => {
  const [data, setData] = useState([]);

  // Function to calculate the time remaining
  const calculateTimeRemaining = (endDate) => {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance <= 0) {
      return "EXPIRED";
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
         
        );
        setData(response.data);  // Here, replace it with the cleaned data when testing locally
        console.log("fetched Data:", response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Timer update for the countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => {
          let expirationDate = item.expiryDate;

          // If expiryDate is valid, calculate the remaining time
          if (expirationDate) {
            return {
              ...item,
              remainingTime: calculateTimeRemaining(expirationDate),
            };
          }

          return { ...item, remainingTime: "Expired" }; // Fallback if no expiry date
        })
      );
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [data]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="slider-container">
                <Slider {...settings}>
                  {data.map((nft, index) => (
                    <div key={index} className="px-2">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="lazy img-fluid"
                              alt={nft.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={nft.authorImage}
                              alt={`${nft.title} author`}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{nft.title}</h4>
                            <strong>${nft.price}</strong>
                          </Link>
                          
                        </div>

                        {/* Display the countdown timer */}
                        <div className="timer">
                          {nft.remainingTime || "Loading..."}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
