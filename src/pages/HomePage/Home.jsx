import React from 'react'
import Navbar from '../../Components/HomeComponent/Navbar/Navbar'
import Hero from '../../Components/HomeComponent/HeroHomeComponent/Hero'
import About from '../../Components/HomeComponent/AboutHomeComponent/About'
import Activities from '../Activities/Activities'
import Facilities from '../../Components/HomeComponent/FacilitiesHomeComponent/Facilities'
import Gallery from '../../Components/HomeComponent/GalleryHomeComponent/Gallery'
import Map from '../../Components/HomeComponent/MapHomeComponent/Map'
import Programs from '../../Components/HomeComponent/ProgramsHomeComponent/Programs'
import AdmissionCTA from '../../Components/HomeComponent/AdmissionCTAHomeComponent/AdmissionCTA'
import Footer from '../../Components/Footer/Footer'

function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <About/>
      <Activities/>
      <Facilities/>
      <Gallery/>
      <Map/>
      <Programs/>
      <AdmissionCTA/>
      <Footer/>
    </>
  )
}

export default Home
