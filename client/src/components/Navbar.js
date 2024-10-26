import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
// import logo from "./CrowdFundingLogo.jpeg";
import "./Navbar.css";

const Navbar = ({
  updateSetState,
  updateConnected,
  connected,
  updateCampaigns,
  campaigns,
  setFilteredCampaigns,
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

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log(campaigns);
    const filtered = campaigns.filter(
      (campaign) =>
        (campaign.title &&
          campaign.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (campaign.description &&
          campaign.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (campaign.owner &&
          campaign.owner.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (campaign.goal &&
          campaign.goal.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (campaign.endDate &&
          campaign.endDate.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredCampaigns(filtered.length > 0 ? filtered : campaigns);
  }, [searchQuery, campaigns, setFilteredCampaigns]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnResize = () => {
    if (window.innerWidth > 768) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", closeMenuOnResize);
    return () => {
      window.removeEventListener("resize", closeMenuOnResize);
    };
  }, []);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>CrowdFund</h1>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search campaigns..."
            onChange={handleSearchChange}
          />
        </div>
        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/Dashboard">Dashboard</Link>
          </div>
          <div className="navbar-buttons">
            <Link to="/CampaignForm">
              <button className="btn create-btn">Create Campaign</button>
            </Link>
            <button
              className="btn wallet-btn"
              onClick={connected ? disconnectWallet : connectWallet}
            >
              {connected ? "Disconnect Wallet" : "Connect Wallet"}
            </button>
          </div>
        </div>
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
