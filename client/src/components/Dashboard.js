import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ campaigns }) => {
    return (
        <div className="dashboard">
            {campaigns.map((campaign, index) => (
                <Link to={`/CampaignDetails/${index}`} key={index} className="campaign-link">
                    <div className="campaign-card">
                        <img src={campaign.imageUrl} alt={campaign.title} className="campaign-image" />
                        <div className="campaign-info">
                            <h3>{campaign.title}</h3>
                            <p><strong>Creator:</strong> {campaign.owner }</p>
                            <p>{campaign.description.slice(0,100)}<spam className="blue">...See more</spam></p>
                            <p><strong>Goal:</strong> ${campaign.goal}</p>
                            <p><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
                            <Link to={`/CampaignDetails/${index}`}>
                                <button className="see-details-btn">Create Campaign</button>
                            </Link>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Dashboard;
