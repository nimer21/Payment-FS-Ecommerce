import React from 'react'

function Footer() {
  return (
    <footer className='bg-slate-200'>
      {/* Container */}
      <div className='container mx-auto py-4'>
        <p className='text-center font-bold' title='Youtube Channel'>© {new Date().getFullYear()} Your Website. All rights reserved.</p>
      </div>
       {/* End of Footer */}     
    </footer>
  )
}

export default Footer