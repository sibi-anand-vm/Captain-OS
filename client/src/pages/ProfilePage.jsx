import React from 'react'
import { Link } from 'react-router-dom'
import UserProfileCard from '../components/Profile/UserProfileCard'

function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/home"
        className="inline-flex items-center gap-1.5 text-gray-600 hover:text-black-900 dark:text-black-400 dark:hover:text-black font-medium mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Profile</h1>
      <UserProfileCard />
    </div>
  )
}

export default ProfilePage
