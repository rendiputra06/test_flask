import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, Table, Button } from 'react-bootstrap';

const Settings = () => {
    const [globalSettings, setGlobalSettings] = useState([]);
    const [menuSettings, setMenuSettings] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };

        const fetchGlobalSettings = async () => {
            try {
                const response = await axios.get('/api/settings/global', { headers });
                setGlobalSettings(response.data);
            } catch (error) {
                console.error("Failed to fetch global settings", error);
            }
        };

        const fetchMenuSettings = async () => {
            try {
                // This one is public, but we need headers for admin actions
                const response = await axios.get('/api/settings/menu');
                setMenuSettings(response.data);
            } catch (error) {
                console.error("Failed to fetch menu settings", error);
            }
        };

        fetchGlobalSettings();
        fetchMenuSettings();
    }, []);

    return (
        <div>
            <h2>Settings</h2>
            <Tabs defaultActiveKey="global" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="global" title="Global Settings">
                    <Button variant="primary" className="mb-3">Add Global Setting</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {globalSettings.map(setting => (
                                <tr key={setting.key}>
                                    <td>{setting.key}</td>
                                    <td>{setting.value}</td>
                                    <td>
                                        <Button variant="info" size="sm">Edit</Button>{' '}
                                        <Button variant="danger" size="sm">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="menu" title="Menu Settings">
                <Button variant="primary" className="mb-3">Add Menu Item</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>URL</th>
                                <th>Icon</th>
                                <th>Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuSettings.map(menu => (
                                <tr key={menu.id}>
                                    <td>{menu.id}</td>
                                    <td>{menu.name}</td>
                                    <td>{menu.url}</td>
                                    <td>{menu.icon}</td>
                                    <td>{menu.order}</td>
                                    <td>
                                        <Button variant="info" size="sm">Edit</Button>{' '}
                                        <Button variant="danger" size="sm">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </div>
    );
};

export default Settings;
