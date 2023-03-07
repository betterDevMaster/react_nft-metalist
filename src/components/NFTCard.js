import React, { useState } from "react";
import Modal from "./Modal";

const NFTCard = ({ nft }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="card nft-card" onClick={() => setOpenModal(!openModal)}>
        <img
          src={nft.meta.content[0].url}
          className="nft-image"
          alt="CartImage"
        />
        <div className="card content">
          <div className="card content-item">NFT Name:</div>
          <div className="card">{nft.meta.name}</div>
          <div className="card content-item">Last Updated At:</div>
          <div className="card address">{nft.lastUpdatedAt}</div>
        </div>
      </div>
      <Modal displayModal={openModal} nft={nft} closeModal={setOpenModal} />
    </>
  );
};

export default NFTCard;
