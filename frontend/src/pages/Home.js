import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from './../components/HorizontalCardProduct';
import VirticalCardProduct from '../components/VirticalCardProduct';

function Home() {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"Airprodes"} heading={"Top's Airprodes"}/>
      <HorizontalCardProduct category={"Mouse"} heading={"Popular's Mouse"}/>
      <VirticalCardProduct category={"Mobile"} heading={"The best and newest Mobiles"}/>
      <VirticalCardProduct category={"Speakers"} heading={"New Sound Speakers"}/>
      <VirticalCardProduct category={"Camera"} heading={"New Camera"}/>
      <VirticalCardProduct category={"Televisions"} heading={"New Televisions"}/>
    </div>
  )
}

export default Home