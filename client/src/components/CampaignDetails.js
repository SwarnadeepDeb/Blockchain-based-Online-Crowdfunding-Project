import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers, parseEther } from 'ethers';
import CustomAlert from './CustomAlert'; 
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
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

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
                if (campaign.owner) {
                    setIsOwner(userAddress === campaign.owner);
                }
                if (parseFloat(campaign.amountRaised) >= parseFloat(campaign.goal) || daysLeft <= 0) {
                    setShowWithdraw(true);
                } else {
                    setShowWithdraw(false);
                }

                setLoading(false);
            }
        };

        fetchCampaignDetails();
    }, [campaign, state]);

    const showCustomAlert = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
    };

    const handleDonate = async () => {
        if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
            showCustomAlert('Please enter a valid donation amount.');
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

            const updatedCampaign = {
                ...campaign,
                amountRaised: newAmountRaised,
                donators: updatedDonators,
            };
            const updatedCampaigns = [...campaigns];
            updatedCampaigns[campaignIndex] = updatedCampaign;
            updateCampaigns(updatedCampaigns);

            if (newAmountRaised >= parseFloat(campaign.goal)) {
                setShowWithdraw(true);
            }
            showCustomAlert('Donation successful.');
        } catch (error) {
            console.error('Donation failed', error);
            showCustomAlert('Donation failed. Please try again.');
        }
    };

    const handleWithdraw = async () => {
        if (amountRaised === 0) {
            showCustomAlert('No funds available for withdrawal.');
            return;
        }

        try {
            const { contract } = state;
            const transaction = await contract.withdrawFunds(campaignIndex);

            await transaction.wait();

            showCustomAlert('Withdrawal successful.');

            setAmountRaised(0);
            setShowWithdraw(false);

            const updatedCampaign = {
                ...campaign,
                amountRaised: 0,
            };
            const updatedCampaigns = [...campaigns];
            updatedCampaigns[campaignIndex] = updatedCampaign;
            updateCampaigns(updatedCampaigns);
        } catch (error) {
            console.error('Withdrawal failed', error);
            showCustomAlert('Withdrawal failed. Please try again.');
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    if (loading) {
        return <p>Loading campaign details...</p>;
    }

    if (!campaign) {
        return <p>Campaign not found</p>;
    }

    return (
        <div className="campaign-details-container">
            {showAlert && (
                <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
            )}
            <div className="campaign-left-column">
                <div className="campaign-details-card">
                    <div className="campaign-header">
                        <h2>{campaign.title}</h2>
                        <p className="campaign-owner"><strong>Creator:</strong> {campaign.owner}</p>
                    </div>
                    <div className="campaign-body">
                        <div className="campaign-image-section">
                            <img src={campaign.imageUrl} alt={campaign.title} className="campaign-image" />
                        </div>
                        <p>{campaign.description}</p>
                    </div>
                </div>
            </div>

            <div className="campaign-right-column">
                <div className="donate-card">
                    <h3>Donate to this Campaign</h3>
                    <p><strong>Goal:</strong> {campaign.goal} ETH</p>
                    <p><strong>Amount Raised:</strong> {amountRaised} ETH</p>
                    <p><strong>Days Left:</strong> {daysLeft < 0 ? 0 : daysLeft} days</p>

                    <input
                        type="number"
                        placeholder="Enter amount to donate"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                    />
                    <button onClick={handleDonate} className="donate-button">Donate</button>

                    {showWithdraw && isOwner && (
                        <button onClick={handleWithdraw} className="withdraw-button">Withdraw Funds</button>
                    )}
                </div>

                <div className="donators-card">
                    <h3>Donators</h3>
                    <ul>
                        {donators.length > 0 ? (
                            donators.map((donator, index) => (
                                <li key={index}>
                                    <span>{donator.name}:</span> {donator.amount} ETH
                                </li>
                            ))
                        ) : (
                            <p>No donations yet.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
