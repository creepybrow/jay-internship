import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get authorId from URL
import AuthorBanner from "../../images/author_banner.jpg";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { Link } from "react-router-dom";
import AuthorItems from "../../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams(); // Get the authorId from the URL
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch author data
    const fetchAuthorData = async () => {
      if (!authorId) return; // Don't proceed if no authorId

      try {
        setLoading(true);
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch author data");
        }

        const data = await response.json();
        setAuthorData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author data:", error);
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  // Handle the copy wallet address functionality
  const handleCopyWallet = () => {
    if (authorData.wallet) {
      navigator.clipboard.writeText(authorData.wallet)
        .then(() => {
          alert("Wallet address copied!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authorData) {
    return <div>Error loading author data</div>;
  }

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
                      <img
                        src={authorData.image || AuthorImage}
                        alt={authorData.name || "Author"}
                      />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.name || "Monica Lucas"}{" "}
                          <span className="profile_username">
                            @{authorData.username || "monicaaaa"}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.wallet || "Wallet Address"}
                          </span>
                          <button id="btn_copy" title="Copy Text" onClick={handleCopyWallet}>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {authorData.followers || "0"} followers
                      </div>
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
