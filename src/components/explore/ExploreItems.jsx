import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg"; // Default author image
import nftImage from "../../images/nftImage.jpg"; // Default NFT image
import axios from "axios";

const ExploreItems = () => {
  const [nftData, setNftData] = useState([]); // State to hold fetched NFT data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [filter, setFilter] = useState("likes_high_to_low"); // Filter state
  const [itemsToShow, setItemsToShow] = useState(8); // Number of items to display initially
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchNftData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        setNftData(response.data); // Set fetched data in state
      } catch (error) {
        setError("Failed to fetch data"); // Handle errors
        console.error("Error fetching NFT data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchNftData();
  }, [filter]); // Re-run effect whenever `filter` changes

  const handleLoadMore = () => {
    setItemsToShow((prevItemsToShow) => prevItemsToShow + 4);
    // show all items or reset the initial number
  };
  const handleLoadLess = () => {
    setItemsToShow((prevItemsToShow) => {
        if(prevItemsToShow > 8) {
            return prevItemsToShow - 4;
        }
        return prevItemsToShow;//Prevent from going below 8 items
    });
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
          {nftData.slice(0, itemsToShow).map((nft) => ( // Slice the data based on itemsToShow
            <div
              key={nft.id} // Unique key for each item
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${nft.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={nft.authorImage || AuthorImage}
                      alt="Author"
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img
                      src={nft.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt="NFT"
                    />
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

          {/*Button to Load More or Load less */}
          {!loading && ! error && (
            <div className="text-center mt-4">
                <button
                onClick={handleLoadMore}
                className="btn btn-primary"
                disabled={itemsToShow >= nftData.length}//Disable if all items are loaded
                >
                    Load More
                </button>
                {itemsToShow > 8 **(
                    <button onClick={handleLoadLess} className="btn btn-secondary ml-2">
                        Load Less
                    </button>
                )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ExploreItems;
