
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// import './styles/BlogPostForm.css';
// import Template1 from './Template1';
// import Template2 from './Template2';


// const BlogPostForm = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
  
//   const [selectedTemplate, setSelectedTemplate] = useState(localStorage.getItem('selectedTemplate') || null);

  
//   const [error, setError] = useState('');
  
//   const navigate = useNavigate();
//   console.log(selectedTemplate)

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     if (image) {
//       formData.append('image', image);
//     }
//     formData.append('template',selectedTemplate);

   

//     try {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       await axios.post('http://localhost:5001/api/posts', formData, config);

//       setTitle('');
//       setContent('');
//       setImage(null);
//       localStorage.removeItem('selectedTemplate')
//       setSelectedTemplate(null)
//       setError('');
//       toast.success('Post Created successfully!');

//       navigate('/bloglist');
//     } catch (error) {
//       setError(error.response?.data.message || 'Error creating post');
//     }
//   };

 

//   const handleTemplateSelect = (template) => {
//     setSelectedTemplate(template);
//     localStorage.setItem('selectedTemplate', template);
//     navigate(`/template/${template}`);
    
//   };

//   return (
//     <div>
//       <div>       
//           <button className='button-block' onClick={() => handleTemplateSelect('Template1')}>
//             Template1
//           </button>
//           <button className='button-block' onClick={() => handleTemplateSelect('Template2')}>
//           Template2
//           </button>      
//       </div>

//       <div className="form-container">
//         <h2>Create New Post</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Title:
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Content:
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Image:
//             <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//           </label>

          
//           <label className='radio'><input type='radio' value={Template1} name='template' /> Template1</label>
//           <label className='radio'><input type='radio' value={Template2} name='template' /> Template2</label>

//           <button type="submit">Create Post</button>
//           {error && <p className="error-message">{error}</p>}
//         </form>
//       </div>
//       {/* {selectedTemplate === 'Template1' && <Template1 title={title} content={content} image={image} />}
//       {selectedTemplate === 'Template2' && <Template2 title={title} content={content} image={image} />}
//        */}
//     </div>
//   );
// };

// export default BlogPostForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles/BlogPostForm.css';
import DataFlex from './DataFlex';
import DataBlog from './DataBlog';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState( null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

 
  useEffect(() => {
    localStorage.removeItem('selectedTemplate')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    formData.append('template', selectedTemplate);
    console.log(formData)
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
      
      setSelectedTemplate(null);
      setError('');
      toast.success('Post Created successfully!');

      navigate('/bloglist');
    } catch (error) {
      setError(error.response?.data.message || 'Error creating post');
    }
  };

  const handleTemplateSelect = (template) => {
    if (selectedTemplate === template) {
      // If the same template is already selected, unselect it
      setSelectedTemplate(null);
    } else {
      setSelectedTemplate(template);
      localStorage.setItem('selectedTemplate', template);
    }
  };

  // Define components for each template
  const renderTemplatePreview = () => {
    switch (selectedTemplate) {
      case 'Template1':
        return <DataFlex />;
      case 'Template2':
        return <DataBlog />;
      default:
        return null;
    }
  };

  return (
    <div className='template-container'>
      <div className="form-container" style={{ maxWidth: selectedTemplate ? '49%' : '100%' }}>
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

          <label className='radio'>
            <input
              type='radio'
              checked={selectedTemplate === 'Template1'}
              onChange={() => handleTemplateSelect('Template1')}
            /> Template1
          </label>
          <label className='radio'>
            <input
              type='radio'
              checked={selectedTemplate === 'Template2'}
              onChange={() => handleTemplateSelect('Template2')}
            /> Template2
          </label>

          <button type="submit">Create Post</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>

     
      {selectedTemplate && (
        <div className="template-preview">
          {renderTemplatePreview()}
        </div>
      )}
    </div>
  );
};

export default BlogPostForm;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// import './styles/BlogPostForm.css';

// import BlogFlexData from './BlogFlexData';
// import BlogData from './BlogData';

// const BlogPostForm = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const [selectedTemplate, setSelectedTemplate] = useState(localStorage.getItem('selectedTemplate') || null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     if (image) {
//       formData.append('image', image);
//     }
//     formData.append('template', selectedTemplate);

//     try {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       await axios.post('http://localhost:5001/api/posts', formData, config);

//       setTitle('');
//       setContent('');
//       setImage(null);
//       localStorage.removeItem('selectedTemplate');
//       setSelectedTemplate(null);
//       setError('');
//       toast.success('Post Created successfully!');

//       navigate('/bloglist');
//     } catch (error) {
//       setError(error.response?.data.message || 'Error creating post');
//     }
//   };

//   const handleTemplateSelect = (template) => {
//     if (selectedTemplate === template) {
//       // If the same template is already selected, unselect it
//       setSelectedTemplate(null);
      
      
//     } else {
//       setSelectedTemplate(template);
//       localStorage.setItem('selectedTemplate', template);
//     }
//   };

//   // Define components for each template
//   const renderTemplatePreview = () => {
//     switch (selectedTemplate) {
//       case 'Template1':
//         return <BlogFlexData />;
//       case 'Template2':
//         return <BlogData />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className='template-container'>
      
//       <div className="form-container">
//         <h2>Create New Post</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Title:
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Content:
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Image:
//             <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//           </label>

//           <label className='checkbox'>
//           <input
//             type='checkbox'
//             checked={selectedTemplate === 'Template1'}
//             onChange={() => handleTemplateSelect('Template1')}
//           /> Template1
//         </label>
//         <label className='checkbox'>
//           <input
//             type='checkbox'
//             checked={selectedTemplate === 'Template2'}
//             onChange={() => handleTemplateSelect('Template2')}
//           /> Template2
//         </label>

//           <button type="submit">Create Post</button>
//           {error && <p className="error-message">{error}</p>}
//         </form>
//       </div>

//       {/* Render the selected template preview */}
//       <div className="template-preview">
//         {renderTemplatePreview()}
//       </div>
//     </div>
//   );
// };

// export default BlogPostForm;




// if checkbox is active then only i want to show  <div className="template-preview">
// {renderTemplatePreview()}
// </div> else i want to render the form only if checkbox is active the form should be small to show to the rendertemplate .give css for form when checkboc is active 

// .template-container{
//   display: flex;
// }
// .form-container {
//   max-width: 49% !important;
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   font-family: Arial, sans-serif;
//   margin-top: 20px;
// }

// h2 {
//   text-align: center;
//   margin-bottom: 20px;
// }

// form {
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// }

// label {
//   display: flex;
//   flex-direction: column;
//   font-size: 1.1em;
//   color: #333;
// }

// input[type='text'],
// textarea {
//   padding: 10px;
//   font-size: 1em;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   margin-top: 5px;
// }

// textarea {
//   resize: vertical;
//   height: 100px;
//   outline: none;
// }

// input[type='file'] {
//   margin-top: 5px;
// }
// .checkbox{
//   display: inline !important;
// }

// button {
//   padding: 10px 15px;
//   font-size: 1em;
//   border: none;
//   border-radius: 4px;
//   background-color: #007bff;
//   color: #fff;
//   cursor: pointer;
//   margin-top: 10px;
// }

// button:hover {
//   background-color: #0056b3;
// }

// .error-message {
//   color: red;
//   text-align: center;
//   margin-top: 10px;
// }

// @media (max-width: 768px) {
//   .form-container {
//     padding: 15px;
//   }

//   label {
//     font-size: 1em;
//   }

//   input[type='text'],
//   textarea {
//     font-size: 0.9em;
//   }

//   button {
//     font-size: 0.9em;
//     padding: 8px 12px;
//   }
// }


// .template-preview{
//   width: 48%;
//   height: auto;
  
// }
