import React from 'react'
import logo from '@assets/images/logo.svg'

const Footer = () => {
  return (
    <footer className="flex flex-col px-1 bg-indigo-900 lg:bg-full sm:col-start-3 sm:col-span-10 md:col-start-1 md:col-span-12">
      <div className="flex flex-col justify-between pt-4 md:flex-row">
        <div>
          <img src={logo} className="block w-24 h-4 mt-1 mb-4 -ml-1" />
          <p className="pr-8 -mt-4 text-sm text-indigo-100 text-legible">live foot.</p>
        </div>
        <div>
          <ul className="flex flex-col gap-2 mt-1 text-sm text-gray-200 capitalize font-recursive md:flex-row md:gap-4">
            <li className="underline">About</li>
            <li className="underline">Sitemap</li>
            <li className="underline">Contact</li>
            <li className="underline">Privacy</li>
            <li className="underline">Terms</li>
            <li className="underline">Advertise</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-100 ">Copyright © {new Date().getFullYear()} Foot live.</p>
        <a className="text-gray-400">Back to top</a>
      </div>
    </footer>
  )
}
export default Footer
