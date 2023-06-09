import React from 'react'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Categories/>
      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default Home
