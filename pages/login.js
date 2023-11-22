import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'

import Layout from "../components/Layout"

function LoginPage() {
  const { data: session } = useSession()

  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

 const { register, handleSubmit, formState: { errors } } = useForm()

 async function submitHandler({ email, password }) {
   try {
    const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
       })

       if (result.error) {
        console.log('faild')
       }
   } catch (err) {
    console.log(err)
   }
 }

  return (
    <Layout title='Login'>
        <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
            <h2 className="mb-4 text-xl">Login</h2>
            <div className="mb-4">
                <input 
                {...register('email', { required: true })}
                type='email' className="w-full rounded-xl p-2 outline-0 bg-stone-700 border-none" id="email" placeholder="Email . . ." autofocus
                />
                {errors.email && (
                    <div className='text-red-500'>Please enter your email.</div>
                )}
            </div>
            <div className="mb-4">
                <input {...register('password', { required: true, minLength: { value: 5, message: 'password must be at least 5 chars.',},
            })} 
            type='password' className="w-full rounded-xl p-2 outline-0  bg-stone-700" id='password' placeholder="Password . . ." autofocus/>
            {errors.password && (
                <div className='text-red-500'>{errors.password.message}</div>
            )}
            </div>
            <div className="mb-4">
                <input {...register('password', { required: true, minLength: { value: 5, message: 'password must be at least 5 chars.',},
            })} 
            type='password' className="w-full rounded-xl p-2 outline-0  bg-stone-700" id='password' placeholder="repeat Password . . ." autofocus/>
            {errors.password && (
                <div className='text-red-500'>{errors.password.message}</div>
            )}
            </div>
            <div className="mb-4">
                <button className="w-full rounded-xl bg-orange-400 text-neutral-800 px-4 py-2 hover:bg-orange-600 hover:text-gray-100">Login</button>
            </div>
            <div className="mb-4">
                <Link href='register' className='hover:text-orange-400'>Register</Link>
            </div>
        </form>
    </Layout>
  )
}

export default LoginPage