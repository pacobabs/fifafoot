import React, { ChangeEvent, useRef } from 'react'

type Props = {
  src: string
  fallbackSrc?: string
  className?: string
  style?: Record<string, unknown>
}

const Image = ({ src, fallbackSrc = '', className = '', style = {} }: Props) => {
  const fallbackRef = useRef<HTMLImageElement | null>(null)
  return (
    <>
      {fallbackSrc ? (
        <img ref={fallbackRef} className={`absolute ${className}`} style={{ ...style, opacity: 0 }} src={fallbackSrc} />
      ) : null}
      <img
        style={style}
        className={className}
        onLoad={() => {
          if (fallbackRef.current) {
            fallbackRef.current.style.display = 'none'
          }
        }}
        src={src}
        loading="lazy"
        onError={(e: ChangeEvent<HTMLImageElement>) => {
          e.target.style.display = 'none'
          if (fallbackRef.current) {
            if (!fallbackSrc) {
              fallbackRef.current.style.display = 'none'
            } else {
              fallbackRef.current.style.opacity = '1'
              fallbackRef.current.style.position = 'static'
            }
          }
        }}
      />
    </>
  )
}

export default Image
