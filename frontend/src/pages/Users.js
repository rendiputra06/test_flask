import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Users = () => {
    const [users, setUsers] = useState([]);
    // Add states for modal, editing, etc.

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User Management</h2>
            <Button variant="primary" className="mb-3">Add User</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.is_active ? 'Yes' : 'No'}</td>
                            <td>{user.is_admin ? 'Yes' : 'No'}</td>
                            <td>
                                <Button variant="info" size="sm">Edit</Button>{' '}
                                <Button variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Add Modal for creating/editing users */}
        </div>
    );
};

export default Users;
