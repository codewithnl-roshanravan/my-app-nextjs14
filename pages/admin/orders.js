import Link from "next/link"

import { useEffect, useState } from "react"

import Layout from "../../components/Layout"

function Orders() {
  const [adminOrders, setAdminOrders ] = useState([])

  useEffect(() => {
    async function fetchData() {
       const response = await fetch('/api/admin/orders')

       const data = await response.json()

       setAdminOrders(data)
    }

    fetchData()
  }, [])

   return <Layout title='Admin Orders'>
     <div className="p-8 grid md:grid-cols-4 md:gap-5">
         <div>
                <ul>
                    <li className="w-1/2 p-2 m-2 bg-orange-400  rounded-md">
                        <Link href='/admin/dashboard' className="font-bold hover:text-neutral-800">Dashboard</Link>
                    </li>
                    <li className="w-1/2 p-2 m-2 bg-orange-400   rounded-md">
                        <Link href='/admin/orders' className="hover:text-neutral-800">Orders</Link>
                    </li>
                    <li className="w-1/2 p-2 m-2 bg-orange-400  rounded-md">
                        <Link href='/admin/products' className="hover:text-neutral-800">Products</Link>
                    </li>
                    <li className="w-1/2 p-2 m-2 bg-orange-400  rounded-md">
                        <Link href='/admin/users' className="hover:text-neutral-800">Users</Link>
                    </li>
                </ul>
            </div>
         <div className="md:col-span-3">
            <h2 className="mb-2 text-xl text-orange-400">Admin Orders</h2>
            {adminOrders.map((item, index) => (
               <div key={index} className="grid grid-cols-4">
                <div className="bg-orange-400 m-2 p-2 rounded-md">
                    <p className="text=lg">Price : {item.totalPrice}</p>
                </div>
                <div className="bg-orange-400 m-2 p-2 rounded-md">
                <p className="text=lg">Payment Method: {item.paymentMethod}</p>
                </div>
               </div> 
            ))}
        </div>
     </div>

   </Layout>
}

export default Orders