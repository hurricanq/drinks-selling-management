import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'

const Successful = () => {
  return (
    <>
      <Navbar isMenu={true} isContact={false} isAbout={false} />
      <div className="bg-white font-poppins">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col items-center gap-3">
            Your order information has been sent to your email!
            <div className="flex gap-3">
              <button className="px-3 py-1 border-solid border-2 border-primary-bg hover:bg-primary-bg hover:text-white transition-colors rounded-xl"><Link to="/products">Continue Shopping</Link></button>
              <button className="px-3 py-1 border-solid border-2 border-primary-bg hover:bg-primary-bg hover:text-white transition-colors rounded-xl"><Link to="/">Go to Home</Link></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Successful
