import { useState } from "react";
import { User } from '@/types/user';

export function useDeleteUser(onSuccess?: () => void) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handledelete = async (id: number, currentUsers: User[], updateUsers: (users: User[]) => void) => {
        setIsDeleting(true);
        setError(null);
        
        // Save original state for potential rollback
        const originalUsers = [...currentUsers];
        
        try {
            // Optimistic update - remove the user immediately
            updateUsers(currentUsers.filter(user => user.id !== id));
            
            const res = await fetch('/api/user', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                throw new Error('Failed to delete user');
            }

            onSuccess?.();
        } catch (err) {
            // Rollback on error
            updateUsers(originalUsers);
            setError(err instanceof Error ? err.message : 'Deletion failed');
        } finally {
            setIsDeleting(false);
        }
    };

    return { handledelete, isDeleting, error };
}