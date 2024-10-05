import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers, parseEther } from 'ethers';
import './CampaignDetails.css';


const CampaignDetails = ({ campaigns, updateCampaigns, state }) => {
    const { id } = useParams();
    const campaignIndex = parseInt(id);
    const campaign = campaigns[campaignIndex];

    const [donationAmount, setDonationAmount] = useState('');
    const [donators, setDonators] = useState([]);
    const [amountRaised, setAmountRaised] = useState(0);
    const [daysLeft, setDaysLeft] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            if (campaign) {
                setDonators(campaign.donators || []);
                setAmountRaised(parseFloat(campaign.amountRaised) || 0);

                const calculateDaysLeft = () => {
                    const endDate = new Date(campaign.endDate);
                    const today = new Date();
                    const timeDiff = endDate - today;
                    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    setDaysLeft(days);
                };
                calculateDaysLeft();

                const { signer } = state;
                const userAddress = await signer.getAddress();

                // Ensure campaign.owner is defined before calling toLowerCase
                if (campaign.owner) {
                    setIsOwner(userAddress.toLowerCase() === campaign.owner.toLowerCase());
                }

                // Check if the campaign has reached the goal or the deadline has passed
                if (parseFloat(campaign.amountRaised) >= parseFloat(campaign.goal) || calculateDaysLeft() <= 0) {
                    setShowWithdraw(true);
                } else {
                    setShowWithdraw(false);
                }

                setLoading(false);
            }
        };

        fetchCampaignDetails();
    }, [campaign, state]);

    const handleDonate = async () => {
        if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }

        try {
            const { contract, signer } = state;
            const userAddress = await signer.getAddress();

            const transaction = await contract.donateToCampaign(campaignIndex, {
                value: parseEther(donationAmount),
            });

            await transaction.wait();

            const newAmountRaised = amountRaised + parseFloat(donationAmount);
            setAmountRaised(newAmountRaised);

            const newDonator = {
                name: userAddress,
                amount: parseFloat(donationAmount),
            };
            const updatedDonators = [...donators, newDonator];
            setDonators(updatedDonators);
            setDonationAmount('');

            // Update the specific campaign in the campaigns array
            const updatedCampaign = {
                ...campaign,
                amountRaised: newAmountRaised,
                donators: updatedDonators,
            };
            const updatedCampaigns = [...campaigns];
            updatedCampaigns[campaignIndex] = updatedCampaign;
            updateCampaigns(updatedCampaigns);

            // Check if the campaign has reached the goal after the donation
            if (newAmountRaised >= parseFloat(campaign.goal)) {
                setShowWithdraw(true);
            }
        } catch (error) {
            console.error('Donation failed', error);
            alert('Donation failed. Please try again.');
        }
    };

    const handleWithdraw = async () => {
        if (amountRaised === 0) {
            alert('No funds available for withdrawal.');
            return;
        }

        try {
            const { contract } = state;
            const transaction = await contract.withdrawFunds(campaignIndex);

            await transaction.wait();

            alert('Withdrawal successful.');

            // Reset the campaign state after withdrawal
            setAmountRaised(0);
            setShowWithdraw(false);

            // Update the specific campaign in the campaigns array
            const updatedCampaign = {
                ...campaign,
                amountRaised: 0,
            };
            const updatedCampaigns = [...campaigns];
            updatedCampaigns[campaignIndex] = updatedCampaign;
            updateCampaigns(updatedCampaigns);
        } catch (error) {
            console.error('Withdrawal failed', error);
            alert('Withdrawal failed. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading campaign details...</p>;
    }

    if (!campaign) {
        return <p>Campaign not found</p>;
    }

    return (
        <div className="campaign-details">
            <h2>{campaign.title}</h2>
            <p><strong>Creator:</strong> {campaign.owner}</p>
            <img src={campaign.imageUrl} alt={campaign.title} className="campaign-image" />
            <p>{campaign.description}</p>
            <p><strong>Goal:</strong> ${campaign.goal}</p>
            <p><strong>Amount Raised:</strong> ${amountRaised}</p>
            <p><strong>Days Left:</strong> {daysLeft<0?0:daysLeft}</p>
            
            {!showWithdraw && (
                <div className="donate-section">
                    <input
                        type="number"
                        placeholder="Enter amount to donate"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                    />
                    <button onClick={handleDonate}>Donate</button>
                </div>
            )}

            {showWithdraw && isOwner && (
                <div className="withdraw-section">
                    <button onClick={handleWithdraw}>Withdraw</button>
                </div>
            )}

            <div className="donators-section">
                <h3>Donators</h3>
                <ul>
                    {donators.map((donator, index) => (
                        <li key={index}>{donator.name}: ${donator.amount}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CampaignDetails;
