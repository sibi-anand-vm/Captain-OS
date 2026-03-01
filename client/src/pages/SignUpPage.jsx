import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import SignUpForm from '../components/SignUp/SignUpForm'

function SignUpPage() {
  const navigate = useNavigate()

  const handleSignUp = async (signUpForm) => {
    if (!signUpForm?.name || !signUpForm?.mail || !signUpForm?.password) {
      toast.warning('Fill all fields')
      return
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signUpForm }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(data.message || 'Account created. Please sign in.')
        navigate('/')
      } else {
        toast.error(data.message || 'Sign up failed')
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    }
  }

  return (
    <div>
      <ToastContainer />
      <SignUpForm onSubmitSignUp={handleSignUp} />
    </div>
  )
}

export default SignUpPage
