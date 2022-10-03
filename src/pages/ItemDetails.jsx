import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams(); //link param to get id
  const [itemDetailsData, setItemDetailsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchItemDetails() {
      setIsLoading(true);
      const fetchedData = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      );
      setItemDetailsData(fetchedData.data);
      setIsLoading(false);
    }
    fetchItemDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {isLoading ? (
                  <div className="skeleton-box skeletonNftImage"></div>
                ) : (
                  <img
                    src={itemDetailsData.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {isLoading ? (
                    <div
                      className="skeleton-box"
                      style={{ width: "300px", height: "40px" }}
                    ></div>
                  ) : (
                    <h2>
                      {itemDetailsData.title} #{itemDetailsData.tag}
                    </h2>
                  )}

                  <div className="item_info_counts">
                    {isLoading ? (
                      <>
                        <div
                          className="skeleton-box"
                          style={{ width: "80px", height: "30px" }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{ width: "80px", height: "30px" }}
                        ></div>
                      </>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemDetailsData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemDetailsData.likes}
                        </div>
                      </>
                    )}
                  </div>
                  {isLoading ? (
                    <div
                      className="skeleton-box"
                      style={{ width: "100%", height: "100px" }}
                    ></div>
                  ) : (
                    <p>{itemDetailsData.description}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        {isLoading ? (
                          <>
                            <div className="author_list_pp">
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50px",
                                }}
                              ></div>
                            </div>
                            <div className="author_list_info">
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "140px",
                                  height: "20px",
                                }}
                              ></div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetailsData.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetailsData.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetailsData.ownerId}`}>
                                {itemDetailsData.ownerName}
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        {isLoading ? (
                          <>
                            <div className="author_list_pp">
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50px",
                                }}
                              ></div>
                            </div>
                            <div className="author_list_info">
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "140px",
                                  height: "20px",
                                }}
                              ></div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetailsData.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetailsData.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetailsData.creatorId}`}>
                                {itemDetailsData.creatorName}
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{
                          width: "80px",
                          height: "20px",
                        }}
                      ></div>
                    ) : (
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetailsData.price}</span>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
