import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import axios from 'axios';
import './RegisterForm.css'; // Optional: for your custom styles
import { useNavigate } from 'react-router-dom';
import { API_BASE_URI } from '../api/apis';
import { toast } from 'react-toastify';

const { Option } = Select;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URI}/api/auth/register`, values);
      toast.success(res.data.message || 'Registered successfully');
      navigate('/login');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" style={{ maxWidth: 900, margin: '40px auto', padding: 24, backgroundColor: '#fff', borderRadius: 12 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20, color: "blue" }}>Register</h2>

      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Username is required' }]}>
              <Input placeholder="Enter username" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Valid email is required' }]}>
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password is required' }]}>
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="userType" label="User Type" rules={[{ required: true, message: 'Please select a user type' }]}>
              <Select placeholder="Select user type">
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'First name is required' }]}>
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Last name is required' }]}>
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Phone number is required' }]}>
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Address is required' }]}>
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name="city" label="City" rules={[{ required: true, message: 'City is required' }]}>
              <Input placeholder="Enter city" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name="state" label="State" rules={[{ required: true, message: 'State is required' }]}>
              <Input placeholder="Enter state" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name="zip" label="ZIP" rules={[{ required: true, message: 'ZIP code is required' }]}>
              <Input placeholder="Enter ZIP code" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Country is required' }]}>
              <Input placeholder="Enter country" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Register
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Button type="link" onClick={() => navigate("/login")} block>
        Already have an account? Login here
      </Button>
    </div>
  );
};

export default RegisterForm;
