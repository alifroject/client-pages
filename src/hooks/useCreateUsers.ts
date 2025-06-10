import { useState } from "react";

export function useCreateUser(onSuccess?: () => void) {
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState('')


    const handleSubmit = async (e: React.FormEvent, email: string, name: string) => {
        e.preventDefault()
        setSubmitting(true)
        setMessage('')

        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name }),
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

    return {handleSubmit, message, submitting}
}