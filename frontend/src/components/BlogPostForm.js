import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './styles/BlogPostForm.css'
import { toast } from 'react-toastify'
const BlogPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (image) {
      formData.append('image', image)
    }

    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.post('http://localhost:5001/api/posts', formData, config)

      setTitle('')
      setContent('')
      setImage(null)
      setError('')
      toast.success('Post Created successfully!')

      navigate('/bloglist')
    } catch (error) {
      setError(error.response?.data.message || 'Error creating post')
    }
  }

  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <button type="submit">Create Post</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default BlogPostForm
