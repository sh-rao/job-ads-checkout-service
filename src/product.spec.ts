import {initialiseProducts, getProduct} from './product'

describe('initialise products', () => {
    it('check if products are loaded from the config', () => {
        initialiseProducts()
        expect(getProduct('Classic Ad')).toBeDefined()
        expect(getProduct('Stand out Ad')).toBeDefined()
        expect(getProduct('Non existant Ad')).toBeUndefined()
    })
})

