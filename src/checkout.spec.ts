import {PricingRule, readPricingRules} from './pricingRules'
import {Checkout} from "./checkout"
import {getProduct, initialiseProducts} from "./product";

describe('checkout functionality', () => {
    initialiseProducts()
    const pricingRules: PricingRule[] = readPricingRules()
    let checkout = new Checkout(readPricingRules())

    it('total', () => {
        checkout.setCustomer('default')
        checkout.add("Classic Ad")
        checkout.add("Stand out Ad")
        checkout.add("Premium Ad")
        expect(checkout.total()).toStrictEqual(987.97)
    })
});

