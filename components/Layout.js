import Head from 'next/head'
import Link from 'next/link' 

import { useContext, useState, useEffect } from 'react'

import { useSession, signOut } from 'next-auth/react'
import { Menu } from '@headlessui/react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Cookies from 'js-cookie'

import { CartContext } from '../context/Cart'

import DropDown from './DropDown'

function Layout({ title, children }) {
  const { status, data: session } = useSession()

  const { state, dispatch} = useContext(CartContext)
  const { cart } = state

  const [cartItemsCount, setcartItemsCount] = useState(0)

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((acc, cur) => acc + cur.qty, 0))
  }, [cart.cartItems])

  function logoutHandler() {
   Cookies.remove()

   signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      <Head>
        <title>{`${title} - shopping`}</title>
      </Head>
      <ToastContainer position='bottom-center' limit={1} />
      <div className='flex min-h-screen flex-col jusetify-betwen bg-stone-900'>
        <header className='mb-12'>
            <nav className='flex h-14 px-8 justify-between items-center bg-neutral-800'>
               <Link href='/' className='text-lg font-bold text-gray-200 hover:text-orange-400'>Shopping</Link>
              <div>
                 <Link href='/cart' className='p-2 text-orange-400 hover:text-gray-200 hover:font-bold'>Cart
                  <span className='ml-1 rounded-xl bg-orange-400 px-2 py-1 text-xs text-neutral-800 font-bold'>{cartItemsCount}</span>
                 </Link>
                 {status === 'loading' ? (
                  'Loading'
                 ) : session?.user ? (
                   <Menu as='div' className='relative inline-block'>
                    <Menu.Button className='text-orange-400 hover:font-bold'>
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className='absolute right-0 w-56 bg-orange-400 rounded-xl p-4 origin-top-right border-slate-100'>
                      <Menu.Item>
                        <DropDown className='flex p-2' href='#' onClick={logoutHandler}>
                          Logout
                        </DropDown>
                      </Menu.Item>
                      <Menu.Item>
                        <DropDown className='flex p-2' href='/order-history'>
                          Order History
                        </DropDown>
                      </Menu.Item>
                      {session.user.isAdmin && (
                        <Menu.Item>
                        <DropDown className='flex p-2' href='/admin/dashboard'>
                          Dashboard
                        </DropDown>
                      </Menu.Item>
                      )}
                    </Menu.Items>
                   </Menu>
                 ) : (
                  <Link href='/login' className='p-2 text-orange-400 font-bold'>Login</Link>
                 )}
                 
              </div>
            </nav> 
        </header>
        <main className='text-white'>{children}</main>
      </div>
    </>
  )
}

export default Layout