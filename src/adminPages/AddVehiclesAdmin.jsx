import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Row,
  Col,
  Card,
  Typography,
  Divider
} from 'antd';
import axios from 'axios';
import { API_BASE_URI } from '../api/apis';
import { toast } from 'react-toastify';
import ProfileComp from '../reusableComponents/ProfileComp';

const { Option } = Select;
const { Title } = Typography;

const AddVehiclesAdmin = () => {
  const token = localStorage.getItem('token');
  const [form] = Form.useForm();
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false); // toggle state

  const fetchMyVehicles = async () => {
    try {
      const res = await axios.get(`${API_BASE_URI}/api/vehicles/myVehicles`, {
        headers: { 'x-auth-token': token },
      });
      setVehicles(res.data.vehicles || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error loading vehicles');
    }
  };

  useEffect(() => {
    fetchMyVehicles();
  }, []);

  const onFinish = async (values) => {
    try {
      const res = await axios.post(`${API_BASE_URI}/api/vehicles/`, values, {
        headers: { 'x-auth-token': token },
      });
      toast.success(res.data.message);
      form.resetFields();
      setShowForm(false);
      fetchMyVehicles();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding vehicle');
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 24, backgroundColor: '#fff', borderRadius: 12 }}>
      <ProfileComp />

      <Title level={3} style={{ textAlign: 'center' }}>Vehicles Panel</Title>

      {!showForm ? (
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Button type="primary" onClick={() => setShowForm(true)}>
            + Add Vehicle
          </Button>
        </div>
      ) : (
        <div style={{ marginBottom: 32 }}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="name" label="Vehicle Name" rules={[{ required: true }]}>
                  <Input placeholder="e.g. Tata Ace" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="numberPlate" label="Number Plate" rules={[{ required: true }]}>
                  <Input placeholder="e.g. MH12AB1234" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                  <Select placeholder="Select type">
                    <Option value="truck">Truck</Option>
                    <Option value="van">Van</Option>
                    <Option value="pickup">Pickup</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
                  <Input placeholder="e.g. Tata, Ashok Leyland" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="capacityKg" label="Capacity (kg)" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} placeholder="e.g. 1000" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="tyres" label="Number of Tyres" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} min={2} placeholder="e.g. 4" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="fuelType" label="Fuel Type" rules={[{ required: true }]}>
                  <Select placeholder="Select fuel type">
                    <Option value="diesel">Diesel</Option>
                    <Option value="petrol">Petrol</Option>
                    <Option value="electric">Electric</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="mileage" label="Mileage (km/l)" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} min={1} step={0.1} placeholder="e.g. 15" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item>
                  <Row gutter={16} justify="center">
                    <Col>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button danger onClick={() => { setShowForm(false); form.resetFields(); }}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      )}

      <Divider />

      <Title level={4}>My Added Vehicles</Title>

      <Row gutter={[16, 16]}>
        {vehicles.length === 0 ? (
          <Col span={24}><p style={{ textAlign: 'center' }}>No vehicles added yet.</p></Col>
        ) : (
          vehicles.map(vehicle => (
            <Col xs={24} sm={12} md={8} key={vehicle._id}>
              <Card title={vehicle.name} bordered>
                <p><strong>Number Plate:</strong> {vehicle.numberPlate}</p>
                <p><strong>Type:</strong> {vehicle.type}</p>
                <p><strong>Brand:</strong> {vehicle.brand}</p>
                <p><strong>Capacity:</strong> {vehicle.capacityKg} kg</p>
                <p><strong>Tyres:</strong> {vehicle.tyres}</p>
                <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
                <p><strong>Mileage:</strong> {vehicle.mileage} km/l</p>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default AddVehiclesAdmin;
