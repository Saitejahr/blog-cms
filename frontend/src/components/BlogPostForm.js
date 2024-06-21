
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './styles/BlogPostForm.css';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  console.log(selectedTemplate)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    formData.append('template',selectedTemplate);

   

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('http://localhost:5001/api/posts', formData, config);

      setTitle('');
      setContent('');
      setImage(null);
      setSelectedTemplate(null)
      setError('');
      toast.success('Post Created successfully!');

      navigate('/bloglist');
    } catch (error) {
      setError(error.response?.data.message || 'Error creating post');
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div>
      <button className='button-block' onClick={() => handleTemplateSelect('Template1')}>
        Template1
      </button>
      <button className='button-block' onClick={() => handleTemplateSelect('Template2')}>
        Template2
      </button>
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
      
    </div>
  );
};

export default BlogPostForm;
