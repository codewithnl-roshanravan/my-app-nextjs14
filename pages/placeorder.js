 import Link from "next/link"
 import { useRouter } from 'next/router'
 import Image from 'next/image'
 import { useContext } from "react"

 import { CartContext } from "../context/Cart"

import Layout from "../components/Layout"
import CheckoutWizard from '../components/CheckoutWizard'

function PlaceOrderPage() {
  const router = useRouter() 

  const { state } = useContext(CartContext)

  const { cart } = state
 const { shippingData, paymentMethod, cartItems } = cart

 async function placeOrderHandler() {
  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0)


 await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify({
    orderItems: cartItems,
    shippingData,
    paymentMethod,
    totalPrice
    }),
    headers: { 'Content-Type': 'application/json'},
   })


   router.push('/order-completed')
 }


  return (
    <Layout title='Place Order'>
        <CheckoutWizard activeStep={3}/>
        <h1 className="mb-4 text-xl p-4 text-orange-400">Place Order</h1>
        <div className="grid md:grid-cols-4 md:gap-5 pl-4">
            <div className="overflow-x-auto md:col-span-3">
                <div className="p-5">
                    <h2 className="text-lg mb-2">Shipping Data</h2>
                    <div>
                        {shippingData.name}
                        {' - '}
                        {shippingData.address}
                        {' - '}
                        {shippingData.postalCode}
                    </div>
                    <div className="pt-2 text-orange-400">
                        <Link href='/shipping'>Edit</Link>
                    </div>
                </div>
                <div className="p-5">
                  <h2 className="mb-2 text-lg">Payment Method</h2>
                  <div>{paymentMethod}</div>
                  <div className="pt-2 text-orange-400">
                    <Link href='/payment'>Edit</Link>
                  </div>
                </div>
                <div className="overflow-x-auto p-5">
                  <h2 className="mb-5 text-lg text-orange-400">Order Items</h2>
                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="px-5 text-left">Item</th>
                        <th className="px-5 text-right">Quantity</th>
                        <th className="px-5 text-right">Price</th>
                        <th className="px-5 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                       <tr key={item._id} className="border-b">
                        <td>
                          <div className="flex items-center">
                            <Image src={item.image} width={50} height={50} />
                            &nbsp;
                            {item.title}
                          </div>
                        </td>
                        <td className="p-5 text-right">{item.qty}</td>
                        <td className="p-5 text-right">{item.price}</td>
                        <td className="p-5 text-right">{item.qty * item.price}</td>
                       </tr>
                      )
                       )}
                    </tbody>
                  </table>
                  <div className="pt-6 text-orange-400">
                    <Link href='/cart'>Edit</Link>
                  </div>
                </div>
            </div>
            <div className="p-5">
              <h2 className="mb-2 text-orange-400">Order Summery :</h2>
                <ul>
                  <li>
                    <div className="mb-6 flex justify-between">
                      <div>Total Price</div>
                      <div>
                        {cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0)}
                      </div>
                    </div>
                  </li>
                  <li>
                    <button onClick={placeOrderHandler} className="rounded-xl bg-orange-400 text-neutral-800 hover:bg-orange-500 hover:text-gray-200 px-4 py-2">Place Order</button>
                  </li>
                </ul>
            </div>
        </div>
    </Layout>
  )
}

export default PlaceOrderPage