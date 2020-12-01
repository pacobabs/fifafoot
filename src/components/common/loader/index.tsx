import { useState, useEffect, useRef, MutableRefObject, SetStateAction, Dispatch } from 'react'
import { Match } from '@services/types'

const useScrollLoader = (
  topSpinnerRef: MutableRefObject<HTMLDivElement | null>,
  bottomSpinnerRef: MutableRefObject<HTMLDivElement | null>,
  matches: Match[],
  setMatches: Dispatch<SetStateAction<Match[]>>,
  size: number,
  startPage: number
) => {
  const topObserver = useRef<IntersectionObserver | null>(null)
  const bottomObserver = useRef<IntersectionObserver | null>(null)
  const [page, setPage] = useState(1)
  const firstPage = useRef(1)
  const lastPage = useRef(1)
  useEffect(() => {
    if (matches) {
      setPage(startPage)
      firstPage.current = startPage
      lastPage.current = startPage
    }
  }, [matches, startPage, size, setMatches])
  useEffect(() => {
    topObserver.current?.disconnect()
    bottomObserver.current?.disconnect()
    const checkTopIntersection = (entries: IntersectionObserverEntry[]) => {
      if (matches && entries[0].isIntersecting) {
        setPage(firstPage.current - 1)
        window.scrollTo(0, window.scrollY + 1000)
      }
    }
    const checkBottomIntersection = (entries: IntersectionObserverEntry[]) => {
      if (matches && entries[0].isIntersecting) {
        setPage(lastPage.current + 1)
      }
    }
    topObserver.current = new IntersectionObserver(checkTopIntersection, {
      rootMargin: '500px'
    })
    bottomObserver.current = new IntersectionObserver(checkBottomIntersection, {
      rootMargin: '1000px'
    })
    topSpinnerRef.current && topObserver.current.observe(topSpinnerRef.current)
    bottomSpinnerRef.current && bottomObserver.current.observe(bottomSpinnerRef.current)
    return () => {
      topObserver.current?.disconnect()
      bottomObserver.current?.disconnect()
    }
  }, [topSpinnerRef, bottomSpinnerRef, matches])
  useEffect(() => {
    if (matches) {
      if (topSpinnerRef.current) topSpinnerRef.current.classList.remove('hidden')
      if (bottomSpinnerRef.current) bottomSpinnerRef.current.classList.remove('hidden')
      if (firstPage.current <= 1) {
        topObserver.current?.disconnect()
        if (topSpinnerRef.current) topSpinnerRef.current.classList.add('hidden')
      }
      if (lastPage.current * size >= matches.length) {
        bottomObserver.current?.disconnect()
        if (bottomSpinnerRef.current) bottomSpinnerRef.current.classList.add('hidden')
      }
      firstPage.current = Math.min(firstPage.current, page)
      lastPage.current = Math.max(lastPage.current, page)
    }
  }, [page, matches, size, topSpinnerRef, bottomSpinnerRef])
  useEffect(() => {
    if (matches) {
      const start = Math.max(0, (firstPage.current - 1) * size)
      const end = Math.min(matches?.length, lastPage.current * size)
      setMatches(matches.slice(start, end === 0 ? end : end - 1))
    }
  }, [page, matches, size, setMatches])
}

export default useScrollLoader
