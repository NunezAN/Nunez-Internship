import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import ExploreItemCard from "../UI/ExploreItemCard";
import SkeletonExploreItemCard from "../UI/SkeletonExploreItemCard";

const AuthorItems = ({ author, isLoading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading ? (
            <SkeletonExploreItemCard />
          ) : (
            author.nftCollection.map((item) => (
              <ExploreItemCard
                key={item.id}
                item={item}
                authorImage={author.authorImage}
                authorId={author.authorId}
              ></ExploreItemCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
