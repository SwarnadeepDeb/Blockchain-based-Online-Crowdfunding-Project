import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
function Layout({updateSetState,updateConnected,connected,updateCampaigns,campaigns,setFilteredCampaigns}) {
  return (
    <div>
      <Navbar updateSetState={updateSetState} updateConnected={updateConnected} connected={connected} updateCampaigns={updateCampaigns} campaigns={campaigns} setFilteredCampaigns={setFilteredCampaigns}/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
