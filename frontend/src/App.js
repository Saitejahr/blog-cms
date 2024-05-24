import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import BlogPostList from './components/BlogPostList'
import BlogPostForm from './components/BlogPostForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<BlogPostList />} />
          <Route path="/admin/register" element={<RegisterForm />} />
          <Route path="/admin/login" element={<LoginForm />} />
          <Route path="/admin/create" element={<BlogPostForm />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
