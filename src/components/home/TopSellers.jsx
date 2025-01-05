import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TopSellers = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        setData(response.data);  // Assuming response.data is the array of sellers
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <section id="section-popular" className="pb-5">
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
                      {/* Dynamically linking to Author page using item.authorId */}
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
                      <Link to={`/item-details/${item.id}`}>{item.authorName}</Link>
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
