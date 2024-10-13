import React from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({
  updateSetState,
  updateConnected,
  connected,
  updateCampaigns,
}) => {
  const abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "campaigns",
      outputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "target",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amountCollected",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "image",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "string",
          name: "_title",
          type: "string",
        },
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_target",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_deadline",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_image",
          type: "string",
        },
      ],
      name: "createCampaign",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "deployer",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "donateToCampaign",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getCampaigns",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "target",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amountCollected",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "image",
              type: "string",
            },
            {
              internalType: "address[]",
              name: "donators",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "donations",
              type: "uint256[]",
            },
          ],
          internalType: "struct Lock.Campaign[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getDonators",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "numberOfCampaigns",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "withdrawFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];
    const connectWallet = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
  
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          "0xdD04C2F570bE11B84a07EC1F3a2Fe168bBF9b6AD",
          abi,
          signer
        );
  
        updateSetState({ provider, signer, contract });
        updateConnected(true);
      } catch (error) {
        console.error(error);
        updateSetState({
          provider: null,
          signer: null,
          contract: null,
        });
        updateCampaigns([]);
        updateConnected(false);
      }
    };
  
    const disconnectWallet = async () => {
      try {
        updateSetState({
          provider: null,
          signer: null,
          contract: null,
        });
        updateConnected(false);
        updateCampaigns([]);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="home-container">
        <section className="hero">
          <h1 className="hero-title">Empower Your Vision with Crowdfunding</h1>
          <p className="hero-subtitle">
            Discover, support, and fund the next big ideas on a secure blockchain-powered platform.
          </p>
  
          <div className="action-btns">
            <button
              className="btn wallet-btn"
              onClick={connected ? disconnectWallet : connectWallet}
            >
              {connected ? "Disconnect Wallet" : "Connect Wallet"}
            </button>
            <Link to="/Dashboard"><button className="btn explore-btn">Explore Campaigns</button></Link>
          </div>
        </section>
  
        <section className="features">
          <h2>Why Choose Us?</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <i className="fas fa-lock"></i>
              <h3>Secure Transactions</h3>
              <p>Our blockchain technology ensures secure and transparent transactions for all users.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-globe"></i>
              <h3>Global Access</h3>
              <p>Fund projects from anywhere in the world, and connect with a diverse community of innovators.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-bullhorn"></i>
              <h3>Amplify Your Reach</h3>
              <p>Get your ideas in front of the right audience and turn your vision into reality.</p>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Home;
  
