import React, { useState } from "react";

export function useEditUser(onSuccess?: () => void) {
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState('')



    const handleEdit = async (e: React.FormEvent, id: number, email: string, name: string) => {
        e.preventDefault()
        setSubmitting(true)
        setMessage('')

        try {
            const res = await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, email, name }),
            })

            const data = await res.json()

            if (res.ok) {
                setMessage('User created')
                onSuccess?.()

            } else {
                setMessage(data.error || 'Error occurred')
            }

        } catch {
            setMessage('Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    return { handleEdit, message, submitting }
}