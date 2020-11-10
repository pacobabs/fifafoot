import React, { useState, ChangeEvent } from 'react'

type Props = {
  src: string
  fallbackSrc?: string
  className?: string
}

const Image = ({ src, fallbackSrc = '', className = '' }: Props) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {fallbackSrc ? (
        <img
          className={className}
          style={{ position: 'absolute' }}
          {...(loaded && { style: { display: 'none' } })}
          src={fallbackSrc}
        />
      ) : null}
      <img
        style={{ opacity: 0 }}
        className={className}
        onLoad={(e: ChangeEvent<HTMLImageElement>) => {
          setLoaded(true)
          e.target.style.animation = 'opacity 600ms easeIn'
          e.target.style.opacity = '1'
        }}
        src={src}
        loading="lazy"
        onError={(e: ChangeEvent<HTMLImageElement>) => {
          if (!fallbackSrc) {
            e.target.style.display = 'none'
            return
          }
          e.target.src = fallbackSrc
          setLoaded(false)
        }}
      />
    </>
  )
}

export default Image
