'use client'

import { useState } from 'react'
import { useUsers } from '@/hooks/users/useUsers'
import { useCreateUser } from '@/hooks/users/useCreateUsers'

export default function Home() {
  const { users, loading: userLoading, error, refetch } = useUsers()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [, setFormReset] = useState(false)


  const { handleSubmit, message, submitting } = useCreateUser(() => {
    refetch()
    setEmail('')
    setName('')
    setFormReset(true)
  })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <h1 className="text-2xl font-bold">Create a User</h1>

        <form onSubmit={(e) => handleSubmit(e, name, email)} className="flex flex-col gap-4 w-full max-w-sm">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Submit'}
          </button>
        </form>

        {message && <p className="text-sm mt-2">{message}</p>}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <hr className="w-full border-t my-4" />

        <h2 className="text-xl font-semibold">User List</h2>
        <table className="w-full text-sm text-left border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {userLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{user.id}</td>
                  <td className="border px-3 py-2">{user.email}</td>
                  <td className="border px-3 py-2">{user.name || '-'}</td>
                  <td className="border px-3 py-2">{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  )
}
