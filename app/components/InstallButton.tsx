'use client'

import { useState, useEffect } from 'react'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowButton(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response to the install prompt: ${outcome}`)
    setDeferredPrompt(null)
    setShowButton(false)
  }

  if (!showButton) return null

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
    >
      Install App
    </button>
  )
} 