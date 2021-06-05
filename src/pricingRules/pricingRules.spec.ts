import {PricingRule,readPricingRules} from './pricingRules'

describe('read pricing rules', () => {
    it('check if price rules are loaded from the config', () => {
        const pricingRules: PricingRule[] = readPricingRules()
        expect(pricingRules).toHaveLength(3)
        expect(Boolean(pricingRules[0]['quantityPricingRules']) || Boolean(pricingRules[0]['discountPricingRules'])).toBe(true);
    })
})

