import productsData from './product-config.json'
import find from 'lodash/find'

export interface Product {
    name: string,
    description: string,
    price: number
}

const products : Product[] = []
export const initialiseProducts = ()  => {
    productsData.map( (productData: Product) => {
        products.push(productData)
    })
}

export const getProduct = (productName : string) => {
    return find(products, ['name', productName])
}


