import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "./Dashboard.css";

const Dashboard = ({ campaigns, state }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    campaigns.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [campaigns]);

  if (!state.signer) {
    return <Loader message="Please connect your wallet to continue." />;
  }
  if (isLoading && campaigns.length === 0) {
    return (
      <Loader message="We are using the testnet, so fetching data may take longer..." />
    );
  }
  const scrollNext = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0].offsetWidth;
      const nextIndex = Math.min(currentIndex + 1, campaigns.length - 1);
      sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      setCurrentIndex(nextIndex);
    }
  };

  const scrollPrev = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0].offsetWidth;
      const prevIndex = Math.max(currentIndex - 1, 0);
      sliderRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-heading">Explore Our Campaigns</h2>
        <p className="dashboard-description">
          Discover innovative projects and support creative ideas that inspire
          change. Browse through our latest campaigns below!
        </p>
      </div>
      <button
        className="prev-btn"
        onClick={scrollPrev}
        disabled={currentIndex === 0}
      >
        &#8249;
      </button>
      <div className="dashboard-horizontal-slider" ref={sliderRef}>
        {campaigns
          .slice()
          .reverse()
          .map((campaign, index) => (
            <div key={index} className="campaign-item">
              <div
                className="campaign-image"
                style={{ backgroundImage: `url(${campaign.imageUrl})` }}
              ></div>
              <div className="campaign-content">
                <h3>{campaign.title}</h3>
                <p>
                  <strong>Creator:</strong> {campaign.owner}
                </p>
                <p>
                  <strong>Description:</strong>
                  {campaign.description.slice(0, 30)}
                  <span className="blue">...See more</span>
                </p>
                <p>
                  <strong>Goal:</strong> ${campaign.goal}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(campaign.endDate).toLocaleDateString()}
                </p>
                <Link to={`/CampaignDetails/${campaigns.length - 1 - index}`}>
                  <button className="see-details-btn">See Details</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <button
        className="next-btn"
        onClick={scrollNext}
        disabled={currentIndex === campaigns.length - 1}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Dashboard;
