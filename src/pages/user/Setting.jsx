import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Setting() {
  return (
    <div className='sm:space-y-20  space-y-10'>
      <Outlet />
    </div>
  )
}
