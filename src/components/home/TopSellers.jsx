import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import nft from '../../images/nftImage.jpg';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        setData(response.data);  
        console.log(response);
      } catch (error) {
        console.error('Error fetching data', error);
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
  
  return (
    <section id="section-popular" data-aos="fade-up"className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      {/* Dynamically linking to Item Details page using item.nftId */}
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={item.authorImage || "default_image.jpg"} // Use seller's image or a default one
                          alt={`Profile of ${item.authorName}`}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      {/* Link to Author page using item.id */}
                      <Link to={`/item-details/${item.authorId}`}>
                      {item.authorName || 'Unknown Author'}</Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </li>
                ))
              ) : (
                <li>No sellers found</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
