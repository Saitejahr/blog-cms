import React from 'react'
import './styles/ViewPost.css'
import laptop from './assests/laptop.jpg'
import blog from './assests/blog.jpg'
import blogimage from './assests/blogimage.jpg'
import Data from './Data'
import { NavLink } from 'react-router-dom'

const ViewPost = () => {  
    
  return ( 
    
    <div>
      <div>
      <img className='blog-image' src={blogimage}  alt="blogimage"/>
      <span className='image-h1'>Welcome to Blog App</span>
      <span className='image-p'>
In our blog app, we've streamlined the process to make sharing your thoughts and ideas easier than ever. Once you click on 'Admin,' you can swiftly register or log in to gain access to your personal dashboard. From there, creating your own blog is just a click away with the 'Create a Blog' button. Choose from templates tailored to suit your needs, whether you're aiming for a sleek professional look or a cozy, personal feel. Editing and updating your blog is intuitive and user-friendly, allowing you to refine your content until it's just right.</span>
      </div>
      <div className='flex-container'>
      <div className='left-blog'>
        <img src={laptop} alt='Laptop' />
        <div>
        <h1 className='left-h1'>Blog </h1>
        <p className='left-p'>27 JUNE 2024  </p>
        </div>
         <br ></br>
        <img src={blog} alt='blog' />
        <div>
        <h1 className='left-h1'>Blog </h1>
        <p className='left-p'>27 JUNE 2024  </p>
        </div>
      </div>
      <div className="blog-container">
        <h1 style={{textAlign:'center'}}>Blog Post</h1>
          <div className="blog-posts-grid">
              {Data.map((data) => (
                data.id % 2 === 0 ?
                <NavLink to='/blogdata'>
                  <div  key={data.id} className="blog-posts">                 
                    <h2 className="blog-post-title">{data.title}</h2>
                    <p className="blog-post-content">{data.content}</p>
                    <img
                        className="blog-post-image"
                        src={data.img}
                        alt="images"
                    />               
                  </div>
                </NavLink> : <NavLink to='/blogflexdata'>
                  <div  key={data.id} className="blog-posts">                 
                    <h2 className="blog-post-title">{data.title}</h2>
                    <p className="blog-post-content">{data.content}</p>
                    <img
                        className="blog-post-image"
                        src={data.img}
                        alt="images"
                    />               
                  </div>
                </NavLink>
              ))                          
              }
          </div>
      </div>
    </div>
   </div>
    
  )
}

export default ViewPost