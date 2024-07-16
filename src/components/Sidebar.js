// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCog, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Admin</h2>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <Link to="/dashboard" style={styles.link}>
              <FaTachometerAlt style={styles.icon} /> Dashboard
            </Link>
          </li>
          <li style={styles.li}>
            <Link to="/users" style={styles.link}>
              <FaUsers style={styles.icon} /> Users
            </Link>
          </li>
          <li style={styles.li}>
            <Link to="/settings" style={styles.link}>
              <FaCog style={styles.icon} /> Settings
            </Link>
          </li>
          <li style={styles.li}>
            <Link to="/products" style={styles.link}>
              <FaBoxOpen style={styles.icon} /> Products
            </Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout} style={styles.logoutButton}>
        <FaSignOutAlt style={styles.icon} /> Logout
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    background: '#333',
    color: '#fff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px'
  },
  title: {
    marginBottom: '20px'
  },
  nav: {
    flexGrow: 1
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  li: {
    marginBottom: '10px'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: '10px'
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0
  }
};

export default Sidebar;
