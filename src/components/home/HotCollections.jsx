import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState([]);   //state to store fetched nft data

  var settings = {    //variables for the carousel animations
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [           //responsive breakpoints for carousel
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        }
      }
    ]
  };

  useEffect(() => {                             //fetchdata once on load
    async function getHotCollections() {
      const fetchedData = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollectionsData(fetchedData.data);
    }
    getHotCollections();
  }, []);

  
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {/* map thorugh array of fetched data into html */}
          <Slider {...settings}>                    
            {hotCollectionsData.map((data) => (
              <div
                key={data.id}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${data.nftId}`}>
                      <img
                        src={data.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${data.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={data.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{data.title}</h4>
                    </Link>
                    <span>ERC-{data.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
