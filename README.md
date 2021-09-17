# job-ads-checkout-service

A simple checkout service developed in Node.js to configure and manage job ads products.
This service is developed in TypeScript and transpiles to JavaScript in compliance with ES2020.

# Design
This service has been designed with keeping the primary objective of the problem at the core - "the prices of the job ad products change frequently".

The products and prices can be configured, and they are defined in the respective files:
* product-config.json - a very simple configuration that drives the name, description and price of the products that are currently sold
* price-rules-config.json - relatively complex compared to the product configuration
  
  Pricing rules configuration is primarily categorised into two rules and is configured per product for one more customers.
  * Quantity Pricing Rule
  
    This rule configures the quantity of free products for a specific base quantity.
    
    e.g. For all customers (default) for every 5 `Classic Ad` products bought, 1 free product is offered
  * Discount Pricing Rule

    This rule configures the discount (in dollar value) for specific customers per product
    
    e.g. For customer `Axil Coffee Roasters` a discount set to `23` on `Stand out Ad` product would apply $23 discount for each product of that type bought. 
     

# Running the service and tests
NOTE: This service has been developed on macOS, so all the installation steps are applicable only if you're using macOS.

1) Install Node.js
      `brew install node` (v12.22.3)
      
      For other options for installing Node.js on your macOS, see https://nodejs.org/en/download/package-manager/#macos
2) Clone the repo

   `cd` to the directory of your choice and then run 
   `git clone https://github.com/sh-rao/job-ads-checkout-service.git`

3) Run `npm install` to install all the dependencies (you can view the dependencies in package.json)

4) To run the app
   
   `npm start`
    
    Currently, the app doesn't take any input and hence has the following config in the main by default
    * Customer `default` with products with one of each of `Classic Ad`, `Stand out Ad` and `Premium Ad`
      
      Expected Total: `$987.87`
    * Customer `SecondBite` with three `Classic Ad` and one `Premium Ad`
    
      Expected Total: `$934.97`
    * Customer `Axil Coffee Roasters` with three `Stabd out Ad` and one `Premium Ad`
    
      Expected Total: `$1294.96`

5) To run the tests

   `npm test`


#### NOTE: This service has been developed and tested on macOS 10.14: Mojave- 2018; WebStorm IDE v2021.2

