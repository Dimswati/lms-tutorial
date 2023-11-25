import React from 'react'
import Sidebar from './_components/Sidebar'
import Navbar from './_components/navbar'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className='h-full'>
      <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
        <Navbar/>
      </div>
      <div className='hidden md:flex w-56 flex-col fixed inset-y-0'>
        <Sidebar />
      </div>
      <main className='md:pl-56 h-full pt-[80px]'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout