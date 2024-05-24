import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/Header.css'

const Header = () => {
  const [showAdminOptions, setShowAdminOptions] = useState(false)

  const toggleAdminOptions = () => {
    setShowAdminOptions(!showAdminOptions)
  }

  return (
    <header className="header">
      <h1 className="logo">My Blog</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item" onClick={toggleAdminOptions}>
            <span className="nav-link">Admin</span>
          </li>
        </ul>
      </nav>
      {showAdminOptions && (
        <div className="admin-options-container">
          <ul className="admin-options">
            <li className="nav-item">
              <Link to="/admin/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
