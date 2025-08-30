import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useCart} from '../context/CartContext'
const ProductListView = ({ product }) => {
  const navigate = useNavigate()
  const {addToCart} = useCart()
  return (
    <div className='space-y-4 mt-2 rounded-md'>
    
      <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
        <img 
          src={product.image} 
          alt={product.title}  
          className='md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer' 
          onClick={() => navigate(`/product/${product.id}`)} 
        />
        <div className='space-y-2 '>
          <h1 className='font-bold text-lg md:text-xl line-clamp-3 hover:text-red-400 w-[220px] md:w-full'>{product.title}</h1>
          <p className='font-semibold flex items-center text-sm md:text-lg'>$<span className='text-3xl md:text-4xl'>{product.price}</span>({product.discount}% off)</p>
        <p className='text-sm'>FREE delivery <span className='font-semibold'>Fri, 18 Apr</span> <br />Or fatest delivery <span className='font-semibold'> Tomarrow. 17 Apr</span> </p>
        <button onClick={()=>addToCart(product)} className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView
