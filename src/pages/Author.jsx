import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Hook to get the URL parameters
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams(); // Get the authorId from the URL
  const [authorDetails, setAuthorDetails] = useState(null);
  const [loading, setLoading] = useState(true);  // Add a loading state to check data fetching

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        // Log authorId to verify it's being extracted correctly
        console.log('Author ID:', authorId);

        const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`); // Update API URL
        const data = await response.json();
        setAuthorDetails(data); // Set the author details
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching author details", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    if (authorId) {
      fetchAuthorDetails();
    }
  }, [authorId]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  if (!authorDetails) {
    return <div>Author not found</div>;  // Show error if no data is available
  }

  const copyWallet = () => {
    navigator.clipboard.writeText(authorDetails.walletAddress).then(() => {
      alert('Wallet Address Copied!');
    });
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorDetails.authorImage || AuthorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorDetails.authorName}
                          <span className="profile_username">@{authorDetails.username}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorDetails.address}
                          </span>
                          <button id="btn_copy" title="Copy Text" onClick={copyWallet}>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{authorDetails.followers} followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
