import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

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
        setData(response.data);
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

          return { ...item, remainingTime: "No Expiry" }; // Fallback if no expiry date
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
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
    <div id="wrapper">
          <Slider {...settings}>
      <div className="container">
        <div className="new-items__row">
          {data && data.length > 0 ? (
            data.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className="item-info-container">
                  {/* Author Image */}
                  <img className="auth-img" src={item.authorImage} alt="author" />
                  
                  {/* Countdown Timer */}
                  <div className="timer">
                    {item.remainingTime || "Loading..."}
                  </div>

                  {/* NFT Image */}
                  <img src={item.nftImage} alt={item.title} className="nft-img" />
                  
                  <div className="item-info--wrapper">
                    <h2 className="item-title">{item.title}</h2>

                    <div className="item_info_counts">
                      <p className="item_price">Price: {item.price} ETH</p>
                      <i className="fa fa-heart"></i> {item.likes}
                    </div>

                    <div className="price-wrapper"></div>
                  </div>

                  {/* Author Info (optional) */}
                  <div className="item_author">
                    {/* <p>Author ID: {item.authorId}</p> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
        </Slider>
    </div>
  );
};

export default ItemDetails;
