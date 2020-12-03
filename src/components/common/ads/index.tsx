import React from 'react'
import grass from '@assets/images/grass.png'

type Props = {
  min: number
  max: number
}

const Ads = () => {
  const squares = []
  for (let i = 0; i < 10; i++) {
    squares.push(i)
  }
  const generateRandomNum = ({ min, max }: Props) => Math.floor(Math.random() * (max - min + 1) + min)
  return (
    <div className="h-12 mx-0.5 my-0.5 sm:col-start-1 sm:col-span-12 md:col-start-3 md:col-span-8">
      <div className="banner">
        <div className="squares-wrapper">
          <ul className="squares">
            {squares.map((_, i) => {
              const randomDimensions = Math.floor(Math.random() * (150 - 15 + 1) + 15)
              return (
                <li
                  key={i}
                  style={{
                    left: `${generateRandomNum({ min: 0, max: 90 })}%`,
                    width: randomDimensions,
                    height: randomDimensions,
                    animationDelay: `${i % 2 ? generateRandomNum({ min: 0, max: 20 }) : 0}s`,
                    animationDuration: `${generateRandomNum({ min: 10, max: 50 })}s`
                  }}
                />
              )
            })}
          </ul>
        </div>
        <img src={grass} className="object-cover image-overlay" />
        <div className="absolute bottom-3 left-16 sm:left-1/3 lg:left-40">
          <span className="mr-2 text-xs text-indigo-100 font-recursive">Advertise on this site</span>
          <button className="top-0 px-2 py-1 bg-indigo-500 border border-indigo-200 rounded-lg focus:outline-none active:ouline-none font-recursive text-indigo-50">
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  )
}
export default Ads
