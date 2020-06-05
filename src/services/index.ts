import fetch from 'cross-fetch'

const API = 'https://api.fifa.com/api/v1/'

export const fetcher = async function <JSON>(url: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(`${API}${url}`, init)
  return res.json()
}

export * from './hooks'
