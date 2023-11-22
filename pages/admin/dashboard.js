import Layout from "../../components/Layout"
import { useEffect, useState } from "react"

import Link from "next/link"


function DashboardPage() {
  const [adminData, setAdminData] = useState([])

  useEffect(() => {
    async function fetchData() {
        const response = await fetch('api/admin/summary')
     
        const data = await response.json()

       setAdminData(data) 
    }

    fetchData()
  }, [])
  


    return <Layout title='Admin Dashboard'>
        <div className="p-8 grid md:grid-cols-4 md:gap-5">
            <div>
                <ul>
                    <li className="w-1/2 p-2 m-2 bg-orange-400  rounded-md">
                        <Link href='/admin/dashboard' className="font-bold hover:text-neutral-800">Dashboard</Link>
                    </li>
                    <li className="w-1/2 p-2 m-2 bg-orange-400 rounded-md">
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
            <div className="md:cols-span-3">
                <h2 className="mb-4 text-xl text-orange-400 rounded-md">Admin Dashboard</h2>
                <div>
                    {adminData.map((item, index) => (
                       <div key={index} className="flex p-2">
                        <p>Orders</p>
                        <div className="m-5 p-5 bg-orange-400 rounded-xl text-center">
                        <p className="text-3xl">{item.ordersCount}</p>
                        </div>
                        <div className="m-5 p-5 bg-orange-400 rounded-xl text-center">
                        <p className="text-3xl">{item.productsCount}</p>
                        <p>Products</p>
                        </div>
                        <div className="m-5 p-5 bg-orange-400 rounded-xl text-center">
                        <p className="text-3xl">{item.usersCount}</p>
                        <p>Users</p>
                        </div>
                       </div> 
                    ))}
                </div>
            </div>
        </div>
    </Layout>
}


DashboardPage.auth = { adminOnly: true }

export default DashboardPage