import React from "react";
const Modal = (props) => {
  const divStyle = {
    display: props.displayModal ? "block" : "none",
  };

  const closeModal = (e) => {
    e.stopPropagation();
    props.closeModal();
  };

  const handleNavigate = (id) => {
    const realId = id.split(":")[1];
    window.open(`https://testnets.opensea.io/account/${realId}`, "_blank");
  };
  return (
    <div className="modal" onClick={closeModal} style={divStyle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="modal-card content">
          <div className="card content-item">NFT Name:</div>
          <div className="card">{props.nft.meta.name}</div>
          <div className="card content-item">Creator:</div>
          <div className="card address">{props.nft.creators[0].account}</div>
          <div className="card content-item">Contract Address:</div>
          <div className="card address">{props.nft.contract}</div>
          <div className="card content-item">Collection Address:</div>
          <div className="card address">{props.nft.collection}</div>
          <div className="card content-item">Collection Description:</div>
          <p className="card">{props.nft.meta.description}</p>
          <button
            className="card navigate-button"
            onClick={() => handleNavigate(props.nft.creators[0].account)}
          >
            Navigate to OpenSea
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
