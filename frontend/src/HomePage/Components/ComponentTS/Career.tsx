import React from 'react'
import hands from "../imagesCaffee/hands.jpg"



import { NavLink, useNavigate } from "react-router-dom";
const Career = () => {
  return (
    <div className='flex flex-col w-screen h-screen bg-red-500 overflow-hidden'>
      <section className='flex flex-col bg-green-500  h-4/5 justify-center items-center p-5 md:flex-row md:pt-32'>
        <select name="" id="">
          <option value="" disabled selected>Select location</option>
          <option value="Sumatra">Sumatra</option>
          <option value="Java">Java</option>
          <option value="Bali">Kalimantan</option>
          <option value="Bali">Timor-timor</option>
          <option value="Bali">Sulawesi</option>
          <option value="Bali">Papua</option>
        </select>
        <input type="text" placeholder='Find your job type' />
        <NavLink to={"/findjobs"}>FIND JOBS</NavLink>
      </section>

      <section className='flex flex-col bg-red-500  h-3/5 justify-center items-center p-5 md:flex-row md:pt-32'>
        <div className='border-4 w-2/4 h-2/4 border-sky-500 m-2'>2</div>
        <div className='border-4 w-2/4 h-2/4 border-sky-500 m-4'>2</div>
      </section>
    </div>
  )
}
export default Career
