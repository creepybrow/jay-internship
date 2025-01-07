import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

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
        console.log("fetched Data:", response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration
          easing: "ease-in-out", // Easing function
          once: true, // Animation happens only once
          mirror: false, // Disable mirror effect
        });
      }, []);
  

  // Timer update for the countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => {
          let expirationDate = item.expiryDate;

          if (expirationDate) {
            return {
              ...item,
              remainingTime: calculateTimeRemaining(expirationDate),
            };
          }

          return { ...item, remainingTime: "Expired" };
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
    <section id="collections" data-aos="fade-up" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="slider-container">
                <Slider {...settings}>
                  {data.map((nft, index) => (
                    <div key={index} className="px-2">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          {/* Link to the item details page of the NFT */}
                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="lazy img-fluid"
                              alt={nft.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          {/* Link to the author's profile page */}
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

                        {/* Display the number of likes */}
                        <div className="likes">
                          <i className="fa fa-heart"></i> {nft.likes} Likes
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
