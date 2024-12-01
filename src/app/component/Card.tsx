import React from 'react'
import Image from 'next/image'
import { Product } from '@/app/types/product'

interface CardProps {
  item: Product
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="card">
        <img className=" cardImage" src={item.images[0]} alt="product image" />
      {/* <Image src={item.images[0]} alt={item.title} width={200} height={200} /> */}
      <h2>{item.title}</h2>
      <p>Category: {item.category.name}</p>
      <p>Price: ${item.price}</p>
    </div>
  )
}

export default Card