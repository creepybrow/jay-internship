import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingIntro = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row justify-content-center align-items-stretch">
          {/* Set up your wallet */}
          <div className="col-12 col-md-6 col-lg-4 mb-4 feature-box-container">
            <div className="feature-box f-boxed style-3">
              <i data-aos="fade-up" className="bg-color-2 i-boxed icon_wallet"></i>
              <div className="text">
                <h4 data-aos="fade-up">Set up your wallet</h4>
                <p data-aos="fade-up">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i data-aos="fade-up" className="wm icon_wallet"></i>
            </div>
          </div>

          {/* Add your NFT's */}
          <div className="col-12 col-md-6 col-lg-4 mb-4 feature-box-container">
            <div className="feature-box f-boxed style-3">
              <i data-aos="fade-up" className="bg-color-2 i-boxed icon_cloud-upload_alt"></i>
              <div className="text">
                <h4 data-aos="fade-up">Add your NFT's</h4>
                <p data-aos="fade-up">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i data-aos="fade-up" className="wm icon_cloud-upload_alt"></i>
            </div>
          </div>

          {/* Sell your NFT's */}
          <div className="col-12 col-md-6 col-lg-4 mb-4 feature-box-container">
            <div className="feature-box f-boxed style-3">
              <i data-aos="fade-up" className="bg-color-2 i-boxed icon_tags_alt"></i>
              <div className="text">
                <h4 data-aos="fade-up">Sell your NFT's</h4>
                <p data-aos="fade-up">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i data-aos="fade-up" className="wm icon_tags_alt"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
