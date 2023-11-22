import Link from "next/link"

function ProductItem({ item, addToCart }) {
  return (
    <div className="bg-neutral-700 rounded-xl mb-5 block p-5 shadow-xl">
       <Link href={`/product/${item.slug}`}>
       <img src={item.image} className="rounded-t-xl"/>
       </Link> 
       <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${item.slug}`}>
         <h2 className="text-lg hover:text-orange-400">{item.title}</h2>
        </Link>
        <p className="p-2 ">{item.price}</p>
        <button onClick={() => addToCart(item)} className="rounded-xl bg-orange-400 text-neutral-800 px-4 py-2 hover:bg-orange-600 hover:text-gray-100">Add to Cart</button>
       </div>
    </div>
  )
}

export default ProductItem