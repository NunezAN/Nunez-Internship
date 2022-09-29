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
  useEffect(() => {
    async function fetchExploreItems() {
      setIsLoading(true);
      const fetchedData = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExploreItems(fetchedData.data);
      setIsLoading(false);
    }
    fetchExploreItems();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
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
        : exploreItems.slice(0, 8).map((item) => (
            <ExploreItemCard
              key={item.id}
              item={item}
            ></ExploreItemCard>
          ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
