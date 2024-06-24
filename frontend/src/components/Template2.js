import React from 'react'

import './styles/BlogData.css'

const Template2 = ({ title, content, image }) => {

  const imageUrl = image && (`http://localhost:5001/${image.replace(/\\/g, '/')}`);
  return (
    <div className='data-container'>
        {imageUrl && (
            <img className='data-image' src={imageUrl} alt="Uploaded"/>
        )}
      <h1 className='data-heading'>{title}</h1>
      <p className='data-para'>{content}</p>
      {imageUrl && (
      <img className='data-image' src={imageUrl} alt="Uploaded" />
      )}
      <h1 className='data-heading'>{title} </h1>
      <p className='data-para'>{content}</p>
    </div>
  )
}

export default Template2

