import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import BlogPostList from './components/BlogPostList'
import BlogPostForm from './components/BlogPostForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ViewPost from './components/ViewPost'
import BlogData from './components/BlogData'
import BlogFlexData from './components/BlogFlexData'

const App = () => {
  // const [token,setToken] = useState()

  // useEffect(() => {
  //   const tokenValue = localStorage.getItem('token')
  //   setToken(tokenValue)
  // },[])
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={ <ViewPost />} />
          <Route path="/admin/register" element={<RegisterForm />} />
          <Route path="/admin/login" element={<LoginForm />} />
          <Route path="/admin/create" element={<BlogPostForm />} />
          <Route path="/bloglist" element={<BlogPostList />}  />
          <Route path="/blogdata" element={<BlogData />} />
          <Route path="/blogflexdata" element={<BlogFlexData />} />
        </Routes>
        
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
