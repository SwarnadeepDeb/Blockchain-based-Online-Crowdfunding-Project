import './App.css';
import Home from './components/Home';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ethers , formatEther} from 'ethers';
import Layout from './components/Layout';
import CampaignForm from './components/campaign';
import CampaignDetails from './components/CampaignDetails';
import Dashboard from './components/Dashboard';

function App() {
  const [connected, setConnected] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const updateConnected = (updatedConnected) => setConnected(updatedConnected);
  const updateSetState = (updatedState) => setState(updatedState);

  const updateCampaigns = (updatedCampaigns) => {
    setCampaigns(updatedCampaigns);
    setFilteredCampaigns(updatedCampaigns)
  };



  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        if (!state.contract) return;

        const campaigns = await state.contract.getCampaigns();
        const detailedCampaigns = await Promise.all(
          campaigns.map(async (campaign, index) => {
            const [donators, donations] = await state.contract.getDonators(index);
            return {
              owner: campaign[0],
              title: campaign[1],
              description: campaign[2],
              goal: formatEther(campaign[3]),
              amountRaised: formatEther(campaign[5]),
              endDate: new Date(Number(campaign[4]) * 1000).toISOString().split('T')[0],
              imageUrl: campaign[6],
              donators: donators.map((address, i) => ({
                name: address,
                amount:formatEther(donations[i])
              }))
            };
          })
        );
        setCampaigns(detailedCampaigns);

      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [state]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout updateSetState={updateSetState} updateConnected={updateConnected} connected={connected} updateCampaigns={updateCampaigns} campaigns={campaigns} setFilteredCampaigns={setFilteredCampaigns}/>}>
          <Route index element={<Home updateSetState={updateSetState} updateConnected={updateConnected} connected={connected} updateCampaigns={updateCampaigns}/>} />
          <Route path="CampaignForm" element={<CampaignForm campaigns={campaigns} updateCampaigns={updateCampaigns} state={state}/>} />
          <Route path="CampaignDetails/:id" element={<CampaignDetails campaigns={campaigns} updateCampaigns={updateCampaigns} state={state}/>} />
          <Route path="Dashboard" element={<Dashboard campaigns={filteredCampaigns} state={state}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
