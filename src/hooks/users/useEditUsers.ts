import React, { useState } from "react";

export function useEditUser(onSuccess?: () => void) {
    const [submittingEdit, setSubmitting] = useState(false)
    const [messageEdit, setMessage] = useState('')
    const [error, setError] = useState('')


    const handleEdit = async (e: React.FormEvent, id: number, email: string, name: string) => {
        e.preventDefault()
        setSubmitting(true)
        setMessage('')

        try {
            const res = await fetch(`/api/user/updateUser/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name }),
            })



            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to update user');
            }
            const data = await res.json();
            setMessage('User updated successfully');
            onSuccess?.();
            return data;  // Return the updated user data

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
            setMessage(errorMessage);
        } finally {
            setSubmitting(false)
        }
    }

    return { handleEdit, messageEdit, submittingEdit, error };
}