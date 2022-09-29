import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect } from "react";
import ExploreItemCard from "../UI/ExploreItemCard.jsx";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(8);
  const [apiCall, setApiCall] = useState(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
  );
  useEffect(() => {
    async function fetchExploreItems() {
      setIsLoading(true);
      const fetchedData = await axios.get(apiCall);
      setExploreItems(fetchedData.data);
      setIsLoading(false);
    }
    fetchExploreItems();
  }, [apiCall]);
  function filter(value) {
    if(value === "DEFAULT") {
      setApiCall("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    }
    if(value === "price_low_to_high") {
      console.log(value);
      setApiCall("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high");
    }
    if(value === "price_high_to_low") {
      console.log(value);
      setApiCall("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low");
    }
    if(value === "likes_high_to_low") {
      console.log(value);
      setApiCall("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low");
    }
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue="DEFAULT"
          onChange={(event) => filter(event.target.value)}
        >
          <option value="DEFAULT">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="skeleton-box skeletonProfile"></div>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                    </div>
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
        : exploreItems
            .slice(0, showCards)
            .map((item) => (
              <ExploreItemCard key={item.id} item={item}></ExploreItemCard>
            ))}
      {showCards < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => setShowCards(showCards + 4)}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
