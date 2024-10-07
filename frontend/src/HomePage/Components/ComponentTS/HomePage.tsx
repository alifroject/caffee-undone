import React from 'react'
import '../ComponenCss/HomePage.css'
//images
import coba from "../images/coba.png"
import home_page from "../imagesCaffee/home-page.jpg"
import mySelfrom from "../imagesCaffee/myself.jpg"
import mexican from "../imagesCaffee/mexican.jpg"
import chinese from "../imagesCaffee/chinese.jpg"
import black from "../imagesCaffee/black.jpg"
import hijabi from "../imagesCaffee/hijabi.jpg"
import hands from "../imagesCaffee/hands.jpg"

import fadeIn from '../../../variants'
import { motion } from 'framer-motion'
const HomePage = () => {
  return (

    <div className="main-page">

      <section className='section1'>


        
        <motion.div className='inside'
          variants={fadeIn('up', '0.2')}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.7 }}
        >
          <h1>START YOUR DAY WITH COFFEE</h1>
          <h2>Grab a Cup and Let's Get Started</h2>
          <div className='button-session1'>
            <div className='button-container'>
              <button className='Explore'>Explore</button>
            </div>
            <div className='button-container'>
              <button className='Order' style={{ backgroundColor: 'burlywood', color: 'black' }}>Order</button>
            </div>
          </div>
        </motion.div>
      </section>
      <section className='section2'>

        <img src={mySelfrom} alt="" style={{ width: '40%', height: '90%', objectFit: 'cover', position: 'absolute', left: '22%' }} className='myself' />
        <motion.div className='box-myelf'
          variants={fadeIn('left', '0.2')}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.7 }}
        >
          <p style={{ color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
            Starting your day with a cup of coffee is more than just a routine; it's a way to awaken your senses and prepare for the challenges ahead.
          </p>
          <br></br>
          <p style={{ color: 'white', fontWeight: 'bold' }}>_Alif Jovani Safik.</p>
        </motion.div>

      </section>
      <section className='section3'>
        <h1>We are united to have coffee</h1>
        <div className='these-images'>
          <div className='item item1'></div>
          <div className='item item2'></div>
          <div className='item item3'></div>
          <div className='item item4'></div>
          <div className='item item5'></div>
        </div>
        <button className='button-section3'>Learn More</button>


      </section>
      <section className='container max-auto'>
        <div>
          Some text in here

        </div>
      </section>

    </div>

  )
}

export default HomePage
