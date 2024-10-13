import React, { useState } from 'react';
import { ethers, parseUnits } from 'ethers';
import CustomAlert from './CustomAlert'; 
import './campaign.css';

const CampaignForm = ({ campaigns, updateCampaigns, state }) => {
    const [formData, setFormData] = useState({
        owner: '',
        title: '',
        description: '',
        goal: '',
        amountRaised: 0,
        endDate: '',
        imageUrl: '',
        donators: [],
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const tx = await state.contract.createCampaign(
                formData.owner,
                formData.title,
                formData.description,
                parseUnits(formData.goal, 'ether'),
                new Date(formData.endDate).getTime() / 1000,
                formData.imageUrl
            );
            await tx.wait();
            updateCampaigns([...campaigns, formData]);
            setFormData({
                owner: '',
                title: '',
                description: '',
                goal: '',
                amountRaised: 0,
                endDate: '',
                imageUrl: '',
                donators: [],
            });
            showAlertWithMessage('Campaign created successfully!');
        } catch (error) {
            console.error('Error creating campaign:', error);
            showAlertWithMessage('Error creating campaign. Please try again.');
        }
    };

    const showAlertWithMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); 
    };

    return (
        <div className="campaign-form-container">
            {showAlert && <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
            <form className="campaign-form" onSubmit={handleSubmit}>
                <h2>Create Campaign</h2>
                <label>
                    Campaign owner:
                    <input
                        type="text"
                        name="owner"
                        value={formData.owner}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Campaign Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Goal:
                    <input
                        type="number"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Campaign Image URL:
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Create Campaign</button>
            </form>
            {formData && (
                <div className="campaign-preview">
                    <h2>Campaign Preview</h2>
                    <p><strong>Owner:</strong> {formData.owner}</p>
                    <p><strong>Title:</strong> {formData.title}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Goal:</strong> ${formData.goal}</p>
                    <p><strong>End Date:</strong> {formData.endDate}</p>
                    <img src={formData.imageUrl} alt={formData.title} />
                </div>
            )}
        </div>
    );
};

export default CampaignForm;
