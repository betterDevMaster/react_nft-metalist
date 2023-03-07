import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import NFTContainer from "./components/NFTContainer";

import "./styles/style.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [testWalletAddress, setTestWalletAddress] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setNfts([]);
        setWalletAddress(accounts[0]);
        setTestWalletAddress(null);
      }
    }
  };

  const getNftData = async () => {
    if (!walletAddress && !testWalletAddress) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${
          walletAddress ?? testWalletAddress
        }`
      );
      const data = await response.json();
      setNfts(data.items);
      setLoading(false);
    } catch (error) {
      console.log("error::::", error);
      setLoading(false);
    }
  };

  const connectTestWallet = () => {
    setNfts([]);
    setWalletAddress(null);
    setTestWalletAddress("0x60f80121c31a0d46b5279700f9df786054aa5ee5");
  };

  useEffect(() => {
    getNftData();
  }, [walletAddress, testWalletAddress]);

  return (
    <div className="App">
      <div className="card">
        <div className="text">
          Account: {walletAddress ?? testWalletAddress ?? "Unknown"}
        </div>
        <div className="connect-button-container">
          <button className="connect-button" onClick={connectTestWallet}>
            Connect with Test Account
          </button>
          <button className="connect-button" onClick={connectWallet}>
            Connect Wallet with Your MetaMask Account
          </button>
        </div>
      </div>
      <HashLoader loading={loading} cssOverride={override} color="#36d7b7" />
      {!loading && nfts.length > 0 ? (
        <NFTContainer nfts={nfts} />
      ) : (
        <p className="no-data">No Data Found</p>
      )}
    </div>
  );
}

export default App;
