'use client'

import { useState, useEffect, useId } from 'react'
import { useUsers } from '@/hooks/users/useUsers'
import { useParams } from "next/navigation";
import { useEditUser } from '@/hooks/users/useEditUsers'
import { useUsersId } from '@/hooks/users/useIdUsers'
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function EditUser() {
  const { users, loading: userLoading, error, refetch } = useUsers()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [, setFormReset] = useState(false)

  const router = useRouter();


  const params = useParams();
  const id = params.id as string;


  const { handleEdit, messageEdit, submittingEdit } = useEditUser(() => {
    refetch()
    setEmail('')
    setName('')
    setFormReset(true)
  })
  const { userId, loadingUserId } = useUsersId(id)

  useEffect(() => {
    if (userId) {
      setEmail(userId.email || '')
      setName(userId.name || '')
    }
  }, [userId])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-white text-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hallo</h1>
      {userId && (
        <>
          <p>{userId.id}</p>
          <p>{userId.name}</p>

        </>
      )}
    </div>
  )
}
