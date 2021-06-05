import pricingRulesConfig from './price-rules-config.json'

export interface QuantityPricingRule {
    baseQuantity: number,
    freeQuantity: number,
    customers: string[]
}

export interface DiscountPricingRule {
    discount: number,
    customers: string[]
}

export interface PricingRule {
    product: string,
    quantityPricingRules: QuantityPricingRule[],
    discountPricingRules: DiscountPricingRule[]
}

export const readPricingRules = () : PricingRule[] => {
    let pricingRules : PricingRule[] = []

    pricingRulesConfig.map( (pricingRule: PricingRule) => {
        pricingRules.push(pricingRule)
    })

    return pricingRules
}

