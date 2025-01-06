import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";  // Default author image
import nftImage from "../../images/nftImage.jpg";  // Default NFT image
import axios from "axios";

const ExploreItems = () => {
  const [nftData, setNftData] = useState([]);  // State to hold fetched NFT data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [filter, setFilter] = useState("likes_high_to_low"); // Filter state
  const [visibleItems, setVisibleItems] = useState(8); // Number of items to display initially

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
    const fetchNftData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        setNftData(response.data);  // Set fetched data in state
      } catch (error) {
        setError("Failed to fetch data");  // Handle errors
        console.error("Error fetching NFT data:", error);
        console.log()
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchNftData();
  }, [filter]);  // Re-run effect whenever `filter` changes

  // Timer update for the countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNftData((prevData) =>
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
  }, [nftData]);

  // Function to load more items
  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4); // Increase the number of visible items by 4
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue={filter}
          onChange={(e) => setFilter(e.target.value)} // Update filter state when selection changes
        >
          <option value="likes_high_to_low">Most liked</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
        </select>
      </div>

      {/* Loading state */}
      {loading && <div>Loading...</div>}

      {/* Error handling */}
      {error && <div className="error-message">{error}</div>}

      {/* Dynamically render the items based on nftData */}
      {!loading && !error && nftData.length === 0 ? (
        <div>No items available</div>
      ) : (
        <div className="row">
          {nftData.slice(0, visibleItems).map((nft) => (
            <div
              key={nft.id}  // Unique key for each item
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${nft.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
                    <img className="lazy" src={nft.authorImage || AuthorImage} alt="Author" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {/* Display countdown timer */}
                <div className="de_countdown">
                  {nft.remainingTime || "Loading..."}
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img src={nft.nftImage || nftImage} className="lazy nft__item_preview" alt="NFT" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nft.nftId}`}>
                    <h4>{nft.title || "NFT Item"}</h4>
                  </Link>
                  <div className="nft__item_price">
                    {nft.price || "0.00"} ETH
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && !error && nftData.length > visibleItems && (
        <div className="col-md-12 text-center">
          <button onClick={loadMoreItems} className="btn-main lead">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
