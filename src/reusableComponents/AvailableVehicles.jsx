import React, { useRef, useState } from 'react';
import {
  Form,
  InputNumber,
  Input,
  DatePicker,
  Button,
  Typography,
  Row,
  Col,
  Card,
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { API_BASE_URI } from '../api/apis';

const { Title } = Typography;

const AvailableVehicles = () => {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [rideInfo, setRideInfo] = useState(null);
  const valuesRef = useRef({});


  const onFinish = async (values) => {
    valuesRef.current = values; // Store current form data for booking
    setLoading(true);
    try {
      const params = {
        capacityRequired: values.capacityRequired,
        fromPincode: values.fromPincode,
        toPincode: values.toPincode,
        startTime: values.startTime.toISOString(),
      };

      const res = await axios.get(`${API_BASE_URI}/api/vehicles/available`, {
        params,
        headers: {
          'x-auth-token': token,
        },
      });

      setVehicles(res.data.availableVehicles || []);
      setRideInfo({
        estimatedHours: res.data.estimatedRideDurationHours,
        startTime: res.data.startTime,
        endTime: res.data.endTime,
      });

      toast.success('Available vehicles loaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

 const handleBookNow = async (vehicle) => {
  if (!rideInfo) {
    toast.error("Booking information is missing.");
    return;
  }

  const payload = {
    vehicleId: vehicle._id,
    fromPincode: valuesRef.current.fromPincode,     // See note below
    toPincode: valuesRef.current.toPincode,
    startTime: rideInfo.startTime,
  };

  try {
    const res = await axios.post(`${API_BASE_URI}/api/bookings/`, payload, {
      headers: { 'x-auth-token': token },
    });

    toast.success("Vehicle booked successfully!");
  } catch (err) {
    toast.error(err.response?.data?.message || 'Booking failed');
  }
};


  return (
    <div
      style={{
                margin: '40px auto',
        padding: 24,
        background: '#fff',
        borderRadius: 12,
      }}
    >
      <Title level={3} style={{ textAlign: 'center' }}>
        Check Available Vehicles
      </Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Capacity Required (kg)"
          name="capacityRequired"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: '100%' }} min={100} step={100} />
        </Form.Item>

        <Form.Item
          label="From Pincode"
          name="fromPincode"
          rules={[{ required: true }]}
        >
          <Input placeholder="e.g. 411001" />
        </Form.Item>

        <Form.Item
          label="To Pincode"
          name="toPincode"
          rules={[{ required: true }]}
        >
          <Input placeholder="e.g. 400001" />
        </Form.Item>

        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true }]}
        >
          <DatePicker showTime style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Search Vehicles
          </Button>
        </Form.Item>
      </Form>

      {rideInfo && (
        <div style={{ margin: '20px 0' }}>
          <p>
            <strong>Estimated Ride Duration:</strong>{' '}
            {rideInfo.estimatedHours} hours
          </p>
          <p>
            <strong>Start Time:</strong>{' '}
            {dayjs(rideInfo.startTime).format('YYYY-MM-DD HH:mm')}
          </p>
          <p>
            <strong>End Time:</strong>{' '}
            {dayjs(rideInfo.endTime).format('YYYY-MM-DD HH:mm')}
          </p>
        </div>
      )}

      <Row gutter={[16, 16]}>
        {vehicles.map((vehicle) => (
          <Col xs={24} sm={12} md={8} key={vehicle._id}>
            <Card
              title={vehicle.name}
              bordered
              actions={[
                <Button
                  type="primary"
                  block
                  onClick={() => handleBookNow(vehicle)}
                >
                  Book Now
                </Button>,
              ]}
            >
              <p><strong>Number Plate:</strong> {vehicle.numberPlate}</p>
              <p><strong>Type:</strong> {vehicle.type}</p>
              <p><strong>Brand:</strong> {vehicle.brand}</p>
              <p><strong>Capacity:</strong> {vehicle.capacityKg} kg</p>
              <p><strong>Tyres:</strong> {vehicle.tyres}</p>
              <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
              <p><strong>Mileage:</strong> {vehicle.mileage} km/l</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AvailableVehicles;
