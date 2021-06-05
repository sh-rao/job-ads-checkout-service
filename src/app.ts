import {initialiseProducts} from './product'
import {readPricingRules} from './pricingRules'
import {Checkout} from "./checkout"

const main = () => {
    initialiseProducts()
    let checkout = new Checkout(readPricingRules())
    checkout.setCustomer('default')
    checkout.add("Classic Ad")
    checkout.add("Stand out Ad")
    checkout.add("Premium Ad")
    console.log('$', checkout.total())
    checkout.clear()
    checkout.setCustomer('SecondBite')
    checkout.add("Classic Ad")
    checkout.add("Classic Ad")
    checkout.add("Classic Ad")
    checkout.add("Premium Ad")
    console.log('$', checkout.total())
    checkout.clear()
    checkout.setCustomer('Axil Coffee Roasters')
    checkout.add("Stand out Ad")
    checkout.add("Stand out Ad")
    checkout.add("Stand out Ad")
    checkout.add("Premium Ad")
    console.log('$', checkout.total())
}

main()