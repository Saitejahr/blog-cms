import React from 'react'
import './styles/ViewPost.css'
import Data from './Data'
import { NavLink } from 'react-router-dom'

const ViewPost = () => {  
    
  return ( 
      <div className="blog-container">
          <div className="blog-posts-grid">
              {Data.map((data) => (
                data.id % 2 === 0 ?
                <NavLink to='/blogdata'>
                  <div  key={data.id} className="blog-post">                 
                    <h2 className="blog-post-title">{data.title}</h2>
                    <p className="blog-post-content">{data.content}</p>
                    <img
                        className="blog-post-image"
                        src={data.img}
                        alt="images"
                    />               
                  </div>
                </NavLink> : <NavLink to='/blogflexdata'>
                  <div  key={data.id} className="blog-post">                 
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
    
  )
}

export default ViewPost