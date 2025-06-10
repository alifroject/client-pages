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
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl transition-all duration-300 hover:shadow-3xl">
          {userId && (
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Edit User Profile
              </h2>

              <form
                onSubmit={(e) => handleEdit(e, userId.id, email, name)}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingEdit}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${submittingEdit
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                    }`}
                >
                  {submittingEdit ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    'Update Profile'
                  )}
                </button>

                {messageEdit && (
                  <div className="p-3 rounded-lg bg-green-50 text-green-800 text-sm text-center animate-fade-in">
                    {messageEdit}
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-800 text-sm text-center animate-fade-in">
                    {error}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
