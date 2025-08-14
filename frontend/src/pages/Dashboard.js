import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to the boilerplate dashboard!</p>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Users</Card.Title>
                            <Card.Text>
                                Manage application users.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Settings</Card.Title>
                            <Card.Text>
                                Configure global and menu settings.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Profile</Card.Title>
                            <Card.Text>
                                View and edit your profile.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
