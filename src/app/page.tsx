'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Card from '@/app/component/Card'
import { Dropdown } from '@/app/component/Dropdown'
import { getAllProduct } from '@/app/utils/getProduct'
import { Product } from '@/app/types/product'

export default function Home() {
  const [product, setProduct] = useState<Product[]>([])
  const [searchItem, setSearchItem] = useState('')
  const [priceRange, setPriceRange] = useState(0)

  useEffect(() => {
    console.log("use effect")
    gettingProductArray()
  }, [])

  const gettingProductArray = async () => {
    const productsThroughApi = await getAllProduct()
    setProduct([...productsThroughApi])
    console.log(productsThroughApi)
  }

  const searchItemByPrice = (option: number) => {
    setPriceRange(option)
    console.log('Selected price range: ' + option)
  }

  const filteredProducts = product.filter(data =>
    data.category.name.toLowerCase().includes(searchItem.toLowerCase()))

  const finalProducts = filteredProducts.filter(data => Number(data.price) <= Number(priceRange))

  let productToDisplay: Product[]

  if (filteredProducts.length > 0 && finalProducts.length === 0) {
    productToDisplay = filteredProducts
  }
  else if (filteredProducts.length > 0 && finalProducts.length !== 0) {
    productToDisplay = finalProducts
  }
  else if (filteredProducts.length === 0 && finalProducts.length !== 0) {
    productToDisplay = finalProducts
  }
  else if (filteredProducts.length > 0 && finalProducts.length !== 0 && Number(priceRange) > 12) {
    productToDisplay = [{ id: 0, category: { name: 'not available' }, price: 0, title: '', images: [''] }]
  }
  else {
    productToDisplay = product
  }

  console.log(filteredProducts)
  console.log(finalProducts)
  console.log('Selected price range: ' + priceRange)

  return (
    <div className='parent w-full bg-gray-200'>
      <div className='heading'>
        {/* <Image src="/vite.svg" width={100} height={100} alt="Vite logo" /> */}
        <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-400 text-transparent bg-clip-text">
          SHOPPING LIST WITH
        </h1>

        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={150}
          height={38}
          priority
        />
      </div>

      {/* Introduction Text */}
      <div className='w-full bg-black mt-3'>
        <ul className="p-2 text-sm md:text-lg bg-gradient-to-r from-gray-700 to-gray-400 text-center font-[family-name:var(--font-geist-mono)] text-white">
          <li className="  w-full md:w-1/2 text-end underline mt-2 mb-5">
            <span className="font-semibold pr-2">Class # 11 -- Assignment </span>
            <p className="text-sm pr-2">Ather Ali Siddiqui (Roll No : 193575)</p>
          </li>
          <li className="font-medium">
          
            <p className='border border-gray-100'>Description</p>
            A Next.js application built with TypeScript that implements a shopping list. The web/app displays product cards fetched from an API, and users can filter products by category and price range using dropdown menus.
            The web/app uses the "components with props" technique, where reusable components receive data through props. The design is responsive thanks to Tailwind CSS, ensuring a seamless experience on different screen sizes. Client-side state management is employed to dynamically update the product display based on user input, without the need for page refreshes.
          </li>
        </ul>
      </div>

      <div className="cardParent p-4 border">
        {/* <!-- Search and Dropdown Section --> */}
        <div className="w-full flex flex-col justify-center items-center sm:flex-row sm:space-x-4 mb-4 ">
          <input
            placeholder="Search"
            onChange={(e) => setSearchItem(e.target.value)}
            className="p-2 border rounded w-full sm:w-72 mx-auto sm:mx-0 my-2"
          />
          <div className="w-full sm:w-auto mx-auto sm:mx-0" >
            <Dropdown onSelect={searchItemByPrice} />
          </div>
        </div>

        {/* <!-- Product Display Section --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productToDisplay.map((data) => (
            <Card key={data.id} item={data} />
          ))}
        </div>
      </div>
    </div>
  )
}

