import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = ({ authorId }) => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedNftId, setClickedNftId] = useState(null);
  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    const fetchNftData = async () => {
      if (!authorId) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        console.log(response.data);
        
        // Assuming the response contains 'author' and 'nftCollection' fields
        setNftData(response.data.nftCollection);
        setAuthorInfo(response.data); // Save author details in the state
      } catch (error) {
        setError(error.message || "Failed to fetch data");
        console.error("Error fetching NFT data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNftData();
  }, [authorId]);

  const handleNftClick = (nftId) => {
    if (clickedNftId === nftId) {
      setClickedNftId(null);
    } else {
      setClickedNftId(nftId);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftData && nftData.length > 0 ? (
            nftData.map((nft, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={nft.nftId || index}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/item-details/${nft.nftId}`}
                      onClick={() => handleNftClick(nft.nftId)}
                    >
                      {/* Dynamically use the author's image */}
                      <img
                        className="lazy"
                        src={authorInfo ? authorInfo.authorImage : 'fallback-image.jpg'} // Use author's image or fallback
                        alt="Author"
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button className="black">Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${nft.nftId}`} onClick={() => handleNftClick(nft.nftId)}>
                      {/* Use nftImage dynamically from the API response */}
                      <img
                        src={nft.nftImage || 'default-nft-image.jpg'}  // Use the nft image or fallback
                        className="lazy nft__item_preview"
                        alt="NFT Preview"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <h4>{nft.title || "Default Title"}</h4>
                    </Link>
                    <div className="nft__item_price">{nft.price || "2.52 ETH"}</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes || 97}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No NFTs available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
