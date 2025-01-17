import React , {useEffect} from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const BrowseByCategory = () => {

    useEffect(() => {
      AOS.init({
        duration: 1000,
        easing:"ease-in-out",
        once:true,
        mirror:false,
      });
    }, []);

  return (
    <section id="section-category" data-aos="fade-left" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {/* Category links with two items per row on small screens, three items on medium screens, and six items on larger screens */}
          <div className="col-6 col-sm-4 col-md-2 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-image"></i>
              <span>Art</span>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-2 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-music"></i>
              <span>Music</span>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-2 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-search"></i>
              <span>Domain Names</span>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-2 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-globe"></i>
              <span>Virtual Worlds</span>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-2 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-vcard"></i>
              <span>Trading Cards</span>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-2 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-th"></i>
              <span>Collectibles</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
