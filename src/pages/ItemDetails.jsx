import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import Skeleton from 'react-loading-skeleton';
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);

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

    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton height={400} />
              </div>
              <div className="col-md-4">
                <Skeleton count={5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!itemDetails) {
    return <div>Item not found</div>;
  }

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
                  <div className="author-info">
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
