import React from 'react'

import './styles/BlogFlexData.css'

const Template1 = ({ title, content, image }) => {
  console.log(title,content,image)
    
  const imageUrl = image && (`http://localhost:5001/${image.replace(/\\/g, '/')}`);
  console.log(imageUrl) 
  return (
    <div className="data-containers">
      <div className="data-first">

      {imageUrl && (
        <div className="flex-img">
        <img className="data-img" src={imageUrl} alt="Uploaded" />
      </div>
      )}
        
        <div className="flex-head">
          <h1 className="data-head">{title}</h1>
          <p className="data-paragraph">
          {content}
          </p>
        </div>
      </div>
      <div className="data-second">
        {imageUrl &&
        <div>
          <img className="data-images" src={imageUrl} alt="Uploaded" />
        </div>
        }
        <div>
          <h1 className="data-heading">{title} </h1>
          <p className="data-para">
          {content}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Template1
