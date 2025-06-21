import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Avatar, Spin, Typography, Row, Col } from 'antd';
import axios from 'axios';
import { API_BASE_URI } from '../api/apis';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProfileComp = () => {
  const token = localStorage.getItem('token');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE_URI}/api/auth/profile`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setProfile(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <Title level={4}>Failed to load profile.</Title>
      </div>
    );
  }

  return (
    <Row justify="center" style={{ marginTop: 40 }}>
      <Col xs={24} sm={22} md={20} lg={16}>
        <Card
          bordered
          style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar size={80} icon={<UserOutlined />} />
            <Title level={3} style={{ marginTop: 12 }}>
              {profile.firstName} {profile.lastName}
            </Title>
            <p style={{ color: '#888' }}>{profile.userType?.toUpperCase()}</p>
          </div>

        </Card>
      </Col>
    </Row>
  );
};

export default ProfileComp;
