import React from 'react'
import logo from '@assets/images/logo.svg'
import appStore from '@assets/images/App Store.svg'
import playStore from '@assets/images/Play Store.svg'

const Footer = () => {
  return (
    <footer className="flex flex-col px-1 bg-indigo-900 lg:bg-full sm:col-span-12 md:col-start-1 md:col-span-12">
      <div className="flex justify-between px-2 pt-4">
        <div>
          <img src={logo} className="block w-24 h-4 mt-1 mb-4 -ml-1" />
        </div>
        <div className="flex gap-1">
          <img src={playStore} className="object-contain w-20 h-8" />
          <img src={appStore} className="object-contain w-20 h-8" />
        </div>
        <a
          className="text-gray-400"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          }
        >
          Top
        </a>
      </div>
      <ul className="flex gap-2 px-2 mt-1 text-sm text-gray-200 capitalize font-recursive">
        <li className="underline">About</li>
        <li className="underline">Contact</li>
        <li className="underline">Terms</li>
        <li className="underline">Advertise</li>
      </ul>
      <p className="px-2 text-xs text-gray-100">
        This service is made possible by the FIFA API. Copyright © {new Date().getFullYear()}.
      </p>
    </footer>
  )
}
export default Footer
