import {getProduct, Product} from "../product/product"
import {DiscountPricingRule, PricingRule, QuantityPricingRule} from "../pricingRules/pricingRules"
import find from 'lodash/find'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'

interface Item {
    product: Product
    quantity: number
}

export class Checkout {
    private readonly pricingRules: PricingRule[] = []
    private customer: string = ''
    private items: Item[] = []

    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = pricingRules
    }

    public setCustomer = (customer: string) => {
        this.customer = customer
    }

    public clear = () => {
        this.customer = ''
        this.items = []
    }

    public add = (productName: string) => {
        const product = getProduct(productName)
        if (product) {
            const existingItem = find(this.items, (item: Item) => {
                return item.product.name === productName
            })
            if (existingItem) {
                existingItem.quantity++
            } else {
                let newItem: Item = { 'product': product, 'quantity': 1 }
                this.items.push(newItem)
            }
        }
    }

    public total = () : number => {
        let totalCost: number = 0

        const getDefaultPricingRule = (pricingRules: any[]) => {
            return filter(pricingRules, (pricingRule: any) => {
                return pricingRule.customers.includes('default')
            })
        }

        this.items.forEach( (item: Item) => {
            let pricingRule = find(this.pricingRules, ['product', item.product.name])
            if (pricingRule) {
                // Determine the discounted price of the item
                let itemPrice: number = item.product.price
                let discountPricingRules = filter(pricingRule.discountPricingRules, (discountPricingRule: DiscountPricingRule) => {
                    return discountPricingRule.customers.includes(this.customer)
                })
                if (isEmpty(discountPricingRules)) {
                    discountPricingRules = getDefaultPricingRule(pricingRule.discountPricingRules)
                }
                discountPricingRules.forEach((discountPricingRule: DiscountPricingRule) => {
                    itemPrice = (itemPrice - discountPricingRule.discount)
                })

                // Determine the total quantity
                let quantityPricingRules = filter(pricingRule.quantityPricingRules, (quantityPricingRule: QuantityPricingRule) => {
                    return quantityPricingRule.customers.includes(this.customer)
                })
                if (isEmpty(quantityPricingRules)) {
                    quantityPricingRules = getDefaultPricingRule(pricingRule.quantityPricingRules)
                }
                let totalQuantity: number = 0
                quantityPricingRules.forEach((quantityPricingRule: QuantityPricingRule) => {
                    const freeQuantity: number = (item.quantity / quantityPricingRule.baseQuantity) * quantityPricingRule.freeQuantity
                    totalQuantity += (item.quantity - freeQuantity)
                })

                // Determine the total cost
                totalCost += (itemPrice * totalQuantity)
            }
        })

        return totalCost
    }
}
