import React from "react";
import NFTCard from "./NFTCard";

const NFTContainer = ({ nfts }) => {
  return (
    <div className="nft-container">
      {nfts.map((nft, index) => {
        return <NFTCard key={index} nft={nft} />;
      })}
    </div>
  );
};

export default NFTContainer;
