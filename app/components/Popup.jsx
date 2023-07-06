import React from 'react'
import { UserAuth } from '../context/AuthContext'

const Popup = ({message}) => {
  const { setShowPopup, showPopup } =
		UserAuth()
  return (
    
		<div className='fixed w-fit h-fit p-10 flex mx-auto items-center justify-center bg-black-primary-100  text-blue-primary-100 border-4 border-blue-primary-100'>
			<div>
				<p>{message}</p>
        
			</div>
		</div>
	)
}

export default Popup