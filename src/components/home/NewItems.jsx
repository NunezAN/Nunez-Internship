import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExploreItemCard from "../UI/ExploreItemCard";

const NewItems = () => {
  const [newItemsData, setNewItemsData] = useState([]); //state to store fetched new items data
  const [isLoading, setIsLoading] = useState(false); //state to store loading state

  const [timeNow, setTimeNow] = useState(Date.now); //state to store the time

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

  //fetch data only on page load
  useEffect(() => {
    setIsLoading(true);
    async function getNewItemsData() {
      const fetchedData = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItemsData(fetchedData.data);
      setIsLoading(false);
    }
    getNewItemsData();

    //interval to update time every second
    const interval = setInterval(() => setTimeNow(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  //function to calculate and display remaining time
  function updateTimer(expiryDate) {
    const timer = new Date(expiryDate - timeNow);
    const timerMinutes = timer.getMinutes();
    const timerHours = timer.getHours();
    const timerSeconds = timer.getSeconds();
    return `${timerHours < 10 ? "0" + timerHours : timerHours}h ${
      timerMinutes < 10 ? "0" + timerMinutes : timerMinutes
    }m ${timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}s`;
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {/* map thorugh array of fetched data into html */}
          {/* check if in loading state display skeleton images otherwise display correct information */}
          <Slider {...settings}>
            {isLoading
              ? new Array(5).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div className="skeleton-box skeletonProfile"></div>

                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons"></div>
                        </div>

                        <div className="skeleton-box skeletonNftImage"></div>
                      </div>
                      <div className="nft__item_info">
                        <div>
                          <div className="skeleton-box skeletonName"></div>
                        </div>

                        <div className="skeleton-box skeletonSubName"></div>
                        <div className="nft__item_like">
                          <div className="skeleton-box skeletonLike"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : newItemsData.map((item) => (
                  <ExploreItemCard key={item.id} item={item} carousel={true} />
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
