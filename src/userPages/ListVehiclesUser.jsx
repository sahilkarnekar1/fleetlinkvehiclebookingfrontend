import React, { useState } from 'react'
import AvailableVehicles from '../reusableComponents/AvailableVehicles'
import ProfileComp from '../reusableComponents/ProfileComp'
import { Button, Modal } from 'antd'
import MyBookings from '../reusableComponents/MyBookings'

const ListVehiclesUser = () => {

    const [showBooking, setShowBooking] = useState(false);

    const handleToggle = ()=>{
        setShowBooking(true);
    }


  return (
    <>
    <ProfileComp/>
    <Button type='primary' onClick={handleToggle}>My Booking</Button>
      <AvailableVehicles/>
      
      <Modal
      width={1000}
      footer={null}
        title="My Bookings"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={showBooking}
        // onOk={handleOk}
        onCancel={()=> setShowBooking(false)}
      >
      <MyBookings/>
      </Modal>
    </>
  )
}

export default ListVehiclesUser
