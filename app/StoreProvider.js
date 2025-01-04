"use client"
// StoreProvider.js
import { Provider } from 'react-redux'
import { useRef } from 'react'
import { store } from '@/lib/store/store'

export default function StoreProvider({ children }) {
  const storeRef = useRef(undefined)

  // Initialize store only once
  if (!storeRef.current) {
    storeRef.current = store()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
