import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams(); //link param to get id
  const [authorData, setAuthorData] = useState([]); //state to store fetched author data
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    //function to fetch author data on mount
    async function fetchAuthorData() {
      setIsLoading(true);
      const fetchedData = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthorData(fetchedData.data);
      setIsLoading(false);
    }
    fetchAuthorData();
  }, []);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  {isLoading ? (
                    <>
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <div className="skeleton-box skeletonProfile--author"></div>
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <div>
                                <div className="skeleton-box skeletonName"></div>
                              </div>
                              <div>
                                <div className="skeleton-box skeletonSubName"></div>
                              </div>
                              <div>
                                <div className="skeleton-box skeletonName--long"></div>
                              </div>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="skeleton-box skeleton--button"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={authorData.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorData.authorName}
                              <span className="profile_username">
                                @{authorData.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {authorData.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {isFollowing
                              ? authorData.followers + 1
                              : authorData.followers}{" "}
                            followers
                          </div>
                          {isFollowing ? (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={() => setIsFollowing(false)}
                            >
                              Unfollow
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={() => setIsFollowing(true)}
                            >
                              Follow
                            </Link>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems isLoading={isLoading} author={authorData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
