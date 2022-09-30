import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect } from "react";
import ExploreItemCard from "../UI/ExploreItemCard.jsx";
import SkeletonExploreItemCard from "../UI/SkeletonExploreItemCard";

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
    if (value === "DEFAULT") {
      setApiCall(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
    }
    if (value === "price_low_to_high") {
      console.log(value);
      setApiCall(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
      );
    }
    if (value === "price_high_to_low") {
      console.log(value);
      setApiCall(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
      );
    }
    if (value === "likes_high_to_low") {
      console.log(value);
      setApiCall(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
      );
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
      {isLoading ? (
        <SkeletonExploreItemCard />
      ) : (
        exploreItems
          .slice(0, showCards)
          .map((item) => (
            <ExploreItemCard key={item.id} item={item}></ExploreItemCard>
          ))
      )}
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
