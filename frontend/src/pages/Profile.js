import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Profile = () => {
    const [profile, setProfile] = useState({
        email: '',
        first_name: '',
        last_name: ''
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile/', { headers });
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile data.');
            }
        };
        fetchProfile();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const response = await axios.put('/api/profile/', profile, { headers });
            setProfile(response.data);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile.');
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await axios.put('/api/profile/', { password }, { headers });
            setMessage('Password updated successfully!');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Failed to update password.');
        }
    };

    return (
        <div>
            <h2>My Profile</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Edit Profile Information</Card.Title>
                    <Form onSubmit={handleProfileUpdate}>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={profile.first_name || ''} onChange={(e) => setProfile({...profile, first_name: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={profile.last_name || ''} onChange={(e) => setProfile({...profile, last_name: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={profile.email || ''} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Change Password</Card.Title>
                    <Form onSubmit={handlePasswordUpdate}>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Change Password</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;
