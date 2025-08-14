import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                // This endpoint should be public or require auth
                const response = await axios.get('/api/settings/menu');
                setMenuItems(response.data);
            } catch (error) {
                console.error("Failed to fetch menu items", error);
                // Set default/fallback menu items
                setMenuItems([
                    { id: 1, name: 'Dashboard', url: '/', icon: 'bi-grid' },
                    { id: 2, name: 'Users', url: '/users', icon: 'bi-people' },
                    { id: 3, name: 'Settings', url: '/settings', icon: 'bi-gear' },
                ]);
            }
        };
        fetchMenu();
    }, []);

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Boilerplate</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {menuItems.map(item => (
                    <li className="nav-item" key={item.id}>
                        <NavLink to={item.url} className="nav-link text-white" end>
                            <i className={`bi ${item.icon} me-2`}></i>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <hr />
            {/* Dropdown for profile can be added here */}
        </div>
    );
};

export default Sidebar;
