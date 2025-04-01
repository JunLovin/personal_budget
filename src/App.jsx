import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Header from '@components/Header'
import Hero from '@pages/Hero'

function App() {
  const [isHome, setIsHome] = useState(false)
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      setIsHome(true)
    } else {
      setIsHome(false)
    }
  })
  return (
    <>
    <Header/>
    {isHome &&
      <Hero />
    }
    </>
  )
}

export default App
