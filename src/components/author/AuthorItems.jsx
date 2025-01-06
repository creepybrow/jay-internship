import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get authorId from URL
import AuthorBanner from "../../images/author_banner.jpg";
import AuthorItems from "../../components/author/AuthorItems";
import AuthorImage from "../../images/author_thumbnail.jpg";
import {Link} from "react-router-dom";

const Author = () => {
  const { authorId } = useParams(); // Get the authorId from the URL
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the authorId is present, fetch data
    const fetchAuthorData = async () => {
      if (!authorId) return; // Don't proceed if no authorId

      try {
        setLoading(true); // Start loading when a new author is selected
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch author data");
        }

        const data = await response.json();
        setAuthorData(data);
        setLoading(false); // Data fetched successfully, stop loading
      } catch (error) {
        console.error("Error fetching author data:", error);
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]); // Re-run effect only when authorId changes

  // If still loading, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no author data is returned, show error message
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
          data-bgimage="url(images/author_banner.jpg) top"
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
                        src={authorData.image || AuthorImage} // Dynamic image source
                        alt={authorData.name || "Author"} // Dynamic alt text
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
                          <button id="btn_copy" title="Copy Text">
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
                  <AuthorItems />
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
