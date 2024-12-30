import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  const [data, setData] = useState([]);//State to store the API response
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    //Does this work
  }, []);

  useEffect(() =>{
    window.scrollTo(0,0);

    //Fetch data from the API

    const fetchData = async () => {
      try{
        const response = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
        const result = await response.json();
        setData(result);//Set the data to state
      }catch(error){
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false);//set Loading to false once data is fetched
      }
    };

    fetchData();//Call the fetch function
  }, []);// Empty dependency array means this effect runs once when the component mounts

  //If data is still loading, show a loading message
  if(loading){
    return <div>Loading...</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
