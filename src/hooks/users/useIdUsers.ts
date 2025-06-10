'use client'
import { useState, useEffect } from 'react'
import { User } from '@/types/user'

export const useUsersId = (id: number | string, onSuccess?: () => void) => {
  const [userId, setUsers] = useState<User | null>(null)
  const [loadingUserId, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    const fetchUsers = async () => {
      if (!id) return;
      setLoading(true)
      try {
        const res = await fetch(`/api/user/byId/${id}`, {
          signal: abortController.signal
        })
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setUsers(data)
        if (onSuccess) onSuccess()
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch user')
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchUsers() // ← ADD THIS LINE - actually call the function!
    return () => {
      abortController.abort()
    }
  }, [id, onSuccess])

  return { userId, loadingUserId, error }
}