import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // Assuming you're using react-loading-skeleton
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

// Main component
const ItemDetails = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeReached, setMinLoadingTimeReached] = useState(false);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch item details");
        }

        const data = await response.json();

        if (!data) {
          throw new Error("Item not found");
        }

        setItemDetails(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching item details", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }

    // Simulate minimum loading time of 2 seconds
    const minLoadingTime = 1000; // 2 seconds
    const timer = setTimeout(() => {
      setMinLoadingTimeReached(true); // After 2 seconds, allow the content to be shown
    }, minLoadingTime);

    window.scrollTo(0, 0);

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [id]);

  // If loading or minLoadingTime hasn't passed, show skeletons and gray overlay
  if (loading || !minLoadingTimeReached) {
    return (
      <div id="wrapper" style={{ position: "relative" }}>
        {/* Gray Overlay */}
        <div
          className="loading-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        ></div>

        <div className="no-bottom no-top" id="content">
          <div className="container">
            <div className="row">
              {/* Skeleton for NFT Image */}
              <div className="col-md-6 text-center">
                <Skeleton height={500} width="100%" />
              </div>

              {/* Skeletons for other content */}
              <div className="col-md-4">
                <Skeleton height={80} width="100%" />
                <Skeleton height={50} width="60%" style={{ marginTop: "50px" }} />
                <Skeleton height={20} width="30%" style={{ marginTop: "10px" }} />
                <Skeleton height={20} width="80%" style={{ marginTop: "20px" }} />
                <Skeleton height={30} width="40%" style={{ marginTop: "20px" }} />
                <Skeleton height={30} width="60%" style={{ marginTop: "20px" }} />
                <Skeleton height={30} width="60%" style={{ marginTop: "10px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error handling
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // If no data found
  if (!itemDetails) {
    return <div>Item not found</div>;
  }

  // Once data is fetched, render the content and remove the gray overlay
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
           
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={itemDetails.title || "NFT Item"}
                />
              </div>

              <div className="col-md-4">
                <div className="item_info">
                  
                  <h2>{itemDetails.title || "NFT Item"}</h2>

                  
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye">{itemDetails.views || 0} </i>
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart">{itemDetails.likes || 0}</i>
                    </div>
                  </div>

                 
                  <p>{itemDetails.description || "No description available"}</p>

                 
                  <div className="nft-item-price">
                    <img src={EthImage} alt="Ethereum" />
                    <span>{itemDetails.price || "0.00"} ETH</span>
                  </div>

                  
                  <div className="owner-info">
                    <h3>Owner</h3>
                    <img
                      src={itemDetails.ownerImage || AuthorImage}
                      className="owner-image"
                      alt={itemDetails.ownerName || "Owner"}
                    />
                    <p>{itemDetails.ownerName || "Unknown"}</p>
                  </div>

                 
                  <div className="creator-info">
                    <h3>Creator</h3>
                    <img
                      src={itemDetails.creatorImage || AuthorImage}
                      className="creator-image"
                      alt={itemDetails.creatorName || "Creator"}
                    />
                    <p>{itemDetails.creatorName || "Unknown"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
