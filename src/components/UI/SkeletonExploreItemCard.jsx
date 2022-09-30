import React from "react";

const SkeletonExploreItemCard = () => {
  return new Array(8).fill(0).map((_, index) => (
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
  ));
};

export default SkeletonExploreItemCard;
