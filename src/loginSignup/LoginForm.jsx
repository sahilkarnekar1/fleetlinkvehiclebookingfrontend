import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URI } from '../api/apis';
import { toast } from 'react-toastify';
import axios from 'axios';

const { Option } = Select;

const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    
    try {
     const res = await axios.post(`${API_BASE_URI}/api/auth/login`, values);
      console.log(res);
      
      const data = res.data;
      localStorage.setItem('token', data.token);
      toast.success('Login successful');
      // navigate based on userType
      if (values.userType === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '50px auto',
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="userType"
          label="User Type"
          rules={[{ required: true, message: 'Please select user type' }]}
        >
          <Select placeholder="Select user type">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
