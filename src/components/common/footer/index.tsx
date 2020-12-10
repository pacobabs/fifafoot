import React from 'react'
import logo from '@assets/images/logo.svg'
import appStore from '@assets/images/App Store.svg'
import playStore from '@assets/images/Play Store.svg'

const Footer = () => {
  return (
    <footer className="relative flex flex-col px-1 bg-indigo-900 lg:bg-full sm:col-span-12 md:col-start-1 md:col-span-12 font-inter">
      <div className="flex flex-col px-2 pt-4 justify-evenly md:flex-row">
        <img src={logo} alt="Live foot" className="block w-24 h-4 mt-1 mb-4 -ml-1" />
        <div className="flex gap-1 mr-8">
          <img src={playStore} alt="playstore" className="object-contain w-20 h-8" />
          <img src={appStore} alt="appstore" className="object-contain w-20 h-8" />
        </div>
      </div>
      <ul className="flex gap-2 px-2 mt-1 text-sm text-gray-200 capitalize">
        <li className="underline">About</li>
        <li className="underline">Contact</li>
        <li className="underline">Terms</li>
        <li className="underline">Advertise</li>
      </ul>
      <p className="px-2 text-xs text-gray-100">
        This service is made disponible by the FIFA API. Copyright © {new Date().getFullYear()}.
      </p>
      <a
        className="absolute pt-1 text-gray-400 top-4 right-2"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      >
        Top
      </a>
    </footer>
  )
}
export default Footer
