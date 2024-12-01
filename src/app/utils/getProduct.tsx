import { Product } from '@/app/types/product'

export async function getAllProduct(): Promise<Product[]> {
  const response = await fetch('https://api.escuelajs.co/api/v1/products')
  const data = await response.json()
  return data
}
