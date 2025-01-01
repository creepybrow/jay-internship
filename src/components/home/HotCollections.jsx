// import React, {useEffect, useState} from "react";
// import {Link} from "react-router-dom";
// import {useKeenSlider} from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import axios from "axios";

// //Make the item to export to the live App which will be exported at the bottom
// const HotCollections = () => {
//   //setting data
//   const [data, setData] = useState([]);
//   //fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try{
//         const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
//         setData(response.data);
//       }catch(error){
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   },[]);
//   //defining slider
//   const [sliderRef] = useKeenSlider({
//     slides: {perView:4, spacing: 10},
//   });
//   return(
//     <section id="collections" className="no-bottom">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="text-center">
//               <h2>Hot Collections</h2>

//               <div ref={sliderRef} className="keen-slider">
//                 {data.map((collection) =>(
//                   <div key={collection.id} className="keen-slider__slide">
//                     <div className="nft_col"
//                     data-aos="fade-in"
//                     data-aos-delay="200"
//                     >
//                       <div className="nft_wrap">
//                         <Link to={`/item-details/${collection.nftId}`}>
//                         <img src={collection.nftImage}
//                         className="Lazy img-fluid"
//                         alt={collection.name} />
//                         </Link>
//                         <i className="fa fa-check"></i>
//                       </div>
//                       <div className="nft_coll_pp">
//                         <Link to={`/auth/${collection.authorId}`}>
//                         <img
//                           className="lazy pp-coll"
//                           src={collection.authorImage}
//                           alt={collection.authorName}
//                         >
//                         </img>
//                         </Link>
//                       </div>
//                       <div className="nft_coll_info">
//                         <h4>{collection.title}</h4>

//                         <span>ERC-{collection.code}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default HotCollections;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Slider from "react-slick";

const HotCollections = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
             
              <div className="slider-container">
                <Slider {...settings}>
                  {data.map((nft, index) => (
                    <div key={index} className="px-2">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="lazy img-fluid"
                              alt={nft.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={nft.authorImage}
                              alt={`${nft.title} author`}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{nft.title}</h4>
                          </Link>
                          <span>ERC-{nft.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections; 