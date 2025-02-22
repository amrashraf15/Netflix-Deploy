import React from 'react'
interface NavbarItemProbs{
    label:string
}

const NavbarItem:React.FC<NavbarItemProbs> = ({label}) => {
  return (
    <div className='text-white cursor-pointer hover:text-gray-300 transition'>
      {label}
    </div>
  )
}

export default NavbarItem
