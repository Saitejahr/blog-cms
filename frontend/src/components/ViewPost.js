import React from 'react'
import './styles/ViewPost.css'
import Data from './Data'
import { useNavigate } from 'react-router-dom'


const ViewPost = () => {  
    const navigate = useNavigate() 
    const handleClick = () => {
        navigate('/blogdata')
    }
  return (
    <div className="blog-container">
        <div className="blog-posts-grid">
            {Data.map((data) => (
                <div  key={data.id} className="blog-post">
                    <h2 className="blog-post-title">{data.title}</h2>
                    <p className="blog-post-content">{data.content}</p>
                    <img
                        className="blog-post-image"
                        src={data.img}
                        alt="images"
                    />
                    <button
                  className="blog-button"
                  onClick={handleClick}
                >
                  Know more
                </button>
                
                </div>

            ))
                           
            }
        </div>
    </div>
    
  )
}

export default ViewPost