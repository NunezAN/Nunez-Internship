import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import skeletonThumbnail from "../../images/skeleton_thumbnail.jpg";
import skeletonImg from "../../images/skeletonImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState([]); //state to store fetched nft data
  const [isLoading, setIsLoading] = useState(false); //state to store loading state

  var settings = {
    //variables for the carousel animations
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      //responsive breakpoints for carousel
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        },
      },
    ],
  };

  useEffect(() => {
    //fetchdata once on load
    async function getHotCollections() {
      setIsLoading(true);
      const fetchedData = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollectionsData(fetchedData.data);
      setIsLoading(false);
    }
    getHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {/* map thorugh array of fetched data into html */}
          {/* check if in loading state display skeleton images otherwise display correct information */}
          <Slider {...settings}>
            {isLoading
              ? new Array(5).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <img
                          src={skeletonImg}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="nft_coll_pp">
                        <img
                          className="lazy pp-coll"
                          src={skeletonThumbnail}
                          alt=""
                        />

                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <div>
                          <div className="skeleton-box skeletonName"></div>
                        </div>
                        <div>
                          <div className="skeleton-box skeletonSubName"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : hotCollectionsData.map((data) => (
                  <div key={data.id}>
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
                        <Link to={`/item-details/${data.nftId}`}>
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
