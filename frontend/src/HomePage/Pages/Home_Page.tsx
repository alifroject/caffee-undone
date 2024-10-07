import React from 'react'
import Layout from './Layout'
import HomePage from '../Components/ComponentTS/HomePage'

const Home_Page :React.FC = () => {
  return (
    <>
    <Layout>
      <HomePage/>  {/* Ini adalah Children */}
    </Layout>
    </>
  )
}

export default Home_Page