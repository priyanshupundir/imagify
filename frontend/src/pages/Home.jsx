import React from 'react'
import Headers from '../components/Headers'
import Steps from '../components/steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Headers/>
      <Steps/>
      <Description/>
      <Testimonials/>
      <GenerateBtn/>
    </div>
  )
}

export default Home
