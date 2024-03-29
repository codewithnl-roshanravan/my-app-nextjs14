import { useRouter } from 'next/router'
import Image from 'next/image'
import { useContext } from 'react'

import Layout from "../../components/Layout"

import db from '../../utils/db'
import Product from '../../models/product'
import { CartContext } from '../../context/Cart'

function ProductPage({ product }) {
  const { state, dispatch } = useContext(CartContext)
   
  const router = useRouter()


  if(!product) {
    return <div>Product Not Found.</div>
  }

  function addToCartHandler() {
   const existingItem = state.cart.cartItems.find((item) => item.slug === product.slug)
   
   const qty = existingItem ? existingItem.qty + 1 : 1
  
   if (product.count < qty) {
    alert('Product is out.')

    return 
   }

   dispatch({ type: 'ADD_TO_CART', payload: { ...product, qty } })

   router.push('/cart')
  }

    return (
      <Layout title={product.title}>
        <div className='grid md:grid-cols-4 md:gap-3 bg-stone-700 rounded-xl p-6'>
            <div className='md:cols-span-2'>
                <Image className='rounded-xl' src={product.image} width={340} height={340} layout='responsive'/>
            </div>
            <div>
             <div className='text-lg pt-5 pl-6'>
                <h2>{product.title}</h2>
                <p>{product.cat}</p>
                <p>{product.description}</p>
             </div>
            </div>
            <div className='p-5'>
                <div className='mb-2 flex justify-between'>
                    <div>Price:</div>
                    <div>{product.price}</div>
                </div>
                 <div className='mb-2 flex justify-between'>
                    <div>Status:</div>
                    <div>{product.count > 0 ? 'Available' : 'Unavailable'}</div>
                    </div>
                    <button onClick={addToCartHandler} className='rounded-xl bg-orange-400 text-neutral-800 px-4 py-2 w-full hover:bg-orange-500 hover:text-gray-100 mt-8'>Add To Cart</button>
              

            </div>
        </div>
      </Layout>
    )
}

export default ProductPage

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()

  const product = await Product.findOne({ slug }).lean()

  return {
    props: {
      product: product ? db.convertToObj(product) : null
    }
  }
}