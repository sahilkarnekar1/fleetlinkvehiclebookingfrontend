import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Spin, Button, Popconfirm } from 'antd';
import axios from 'axios';
import { API_BASE_URI } from '../api/apis';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchMyBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URI}/api/bookings/my`, {
        headers: {
          'x-auth-token': token,
        },
      });

      setBookings(res.data.bookings || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`${API_BASE_URI}/api/bookings/deleteMyBooking/${bookingId}`, {
        headers: { 'x-auth-token': token },
      });
      toast.success('Booking deleted successfully');
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete booking');
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: 24 }}>
      <Title level={3} style={{ textAlign: 'center' }}>My Bookings</Title>

      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No bookings found.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {bookings.map((booking) => (
            <Col xs={24} sm={12} md={8} key={booking._id}>
              <Card
                title={booking.vehicleId?.name || 'Vehicle'}
                bordered
                actions={[
                  <Popconfirm
                    title="Are you sure you want to delete this booking?"
                    onConfirm={() => handleDelete(booking._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger type="link" block>Delete Booking</Button>
                  </Popconfirm>
                ]}
              >
                <p><Text strong>Number Plate:</Text> {booking.vehicleId?.numberPlate}</p>
                <p><Text strong>Type:</Text> {booking.vehicleId?.type}</p>
                <p><Text strong>Capacity:</Text> {booking.vehicleId?.capacityKg} kg</p>
                <p><Text strong>From Pincode:</Text> {booking.fromPincode}</p>
                <p><Text strong>To Pincode:</Text> {booking.toPincode}</p>
                <p><Text strong>Start Time:</Text> {dayjs(booking.startTime).format('YYYY-MM-DD HH:mm')}</p>
                <p><Text strong>End Time:</Text> {dayjs(booking.endTime).format('YYYY-MM-DD HH:mm')}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MyBookings;
