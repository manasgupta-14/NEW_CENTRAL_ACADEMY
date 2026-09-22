import React from 'react'
import Navbar from './Navbar/Navbar'
import Hero from './Hero/Hero'
import About from './About/About'
import Activities from './Activities/Activities'
import Facilities from './Facilities/Facilities'
import Gallery from './Gallery/Gallery'
import Map from './Map/Map'
import Programs from './Programs/Programs'
import AdmissionCTA from './AdmissionCTA/AdmissionCTA'
import Footer from './Footer/Footer'

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
