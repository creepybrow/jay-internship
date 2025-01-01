import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import axios from "axios";

const HotCollections = () => {
  //setting data
  const [data, setData] = useState([]);
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        setData(response.data);
      }catch(error){
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[]);
  //defining slider
  const [sliderRef] = useKeenSlider({
    slides: {perView:4, spacing: 10},
  });
  return(
    <section id="collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>

              <div ref={sliderRef} className="keen-slider">
                {data.map((collection) =>(
                  <div key={collection.id} className="keen-slider__slide">
                    <div className="nft_col"
                    data-aos="fade-in"
                    data-aos-delay="200"
                    >
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                        <img src={collection.nftImage}
                        className="Lazy img-fluid"
                        alt={collection.name} />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/auth/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={collection.authorName}
                        >
                        </img>
                        </Link>
                      </div>
                      <div className="nft_coll_info">
                        <h4>{collection.title}</h4>

                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HotCollections;