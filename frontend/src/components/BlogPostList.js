import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/BlogPostList.css' 
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const BlogPostList = () => {
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [editedPost, setEditedPost] = useState({
    title: '',
    content: '',
    image: '',
  })

  const navigate = useNavigate()
  useEffect(() => {
    fetchPosts()
  }, [])

  const logout = () => {
    // Make a request to the logout endpoint
    axios
      .post('http://localhost:5001/api/admin/logout')
      .then(() => {
        // Remove the token from local storage
        localStorage.removeItem('token')
        toast.success('User Logout successfully!')
        // Redirect to the login page or home page
        navigate('/admin/login')
      })
      .catch((error) => {
        console.error('Error logging out:', error)
      })
  }

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/posts')
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error.message)
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post._id)
    setEditedPost({
      title: post.title,
      content: post.content,
      image: post.image,
    })
  }

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/${id}`, editedPost)
      fetchPosts()
      toast.success('Post Updated successfully!') // Fetch updated posts after editing
      setEditingPost(null)
      setEditedPost({ title: '', content: '', image: '' })
    } catch (error) {
      console.error('Error updating post:', error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/${id}`)
      fetchPosts() // Fetch updated posts after deletion
      toast.success('Post Deleted successfully!')
    } catch (error) {
      console.error('Error deleting post:', error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedPost((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePostClick = (postId) => {
    navigate(`/admin/posts/${postId}`);
  };

  const handleCreateBlog = () => {
    navigate('/admin/create')
  }

  return (
    <div className="blog-container">
      <div className="blog-container button">
        <button onClick={handleCreateBlog}>Create a blog</button>
        <button onClick={logout}>Logout</button>
      </div>
      <h1 className="blog-title">Blog Posts</h1>
      
      <div  className="blog-posts-grid">
        {posts.map((post) => (
          <div key={post._id} className="blog-post">
            {editingPost === post._id ? (
              <div className="blog-edit-form">
                <input
                  type="text"
                  name="title"
                  value={editedPost.title}
                  onChange={handleChange}
                />
                <textarea
                  name="content"
                  value={editedPost.content}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="image"
                  value={editedPost.image}
                  onChange={handleChange}
                />
                <button
                  className="blog-button"
                  onClick={() => handleSaveEdit(post._id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h2 key={post._id} onClick={() => handlePostClick(post._id)} className="blog-post-title pointer">{post.title}</h2>
                <p className="blog-post-content">{post.content}</p>
                <img key={post._id} onClick={() => handlePostClick(post._id)}
                  className="blog-post-image pointer"
                  src={`http://localhost:5001/${post.image.replace(
                    /\\/g,
                    '/'
                  )}`}
                  alt={post.title}
                />
                <div className="blog-buttons-container">
                  <button
                    className="blog-button"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="blog-button"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogPostList
