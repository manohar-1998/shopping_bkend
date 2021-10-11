const router = require('./api');
const charges = require('../models/payment');
const stripe = require("stripe")
  ("sk_test_51JJAHkSHEhusvEucsHpjEDI2btfvdWwYxr9seiNRlmi5SQv3MuaCm2HfpaXiSyKtV3Nr9GtUSYcUsCOugGHpdHcx00NdX4K12L");
const uuid = require("uuid").v4


router.post("/checkout", async (req, res) => {

  let error;
  let status;
  try {
    const { token, address, inputList, totalpayable_amount } = req.body;
    let line_items = [];
    // inputList.forEach(eachList => {
    //   var tempList = {};
    //   tempList.quantity = eachList.quantity;
    //   tempList.service = eachList.service;
    //  tempList.price = eachList.price;
    //   line_items.push(tempList);
    // })
 
    // var listdata = inputList.map((value, index) => {
    //   console.log("value=", value, "index==", index);
    //   line_items[index]['quantity'] = value.quantity,
    //   line_items[index]['service'] = value.service,
    //   line_items[index]['price'] = value.price
    // })

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
      // metadata: { listdata },
    });
    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(

      {
        amount: totalpayable_amount * 100,
        currency: "usd",
        customer: customer.id,
         receipt_email: token.email,
        description: `Purchased the  `,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

router.post("/shopcheckout", async (req, res) => {

  let error;
  let status;
  try {
    const { token, product } = req.body;
    console.log("product===",product,"token==",token,"finalbill==",product.finalbill)

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(

      {
        amount: product.finalbill * 100,
        currency: "usd",
        customer: customer.id,
         receipt_email: token.email,
        description: `Final Amount =$ ${product.finalbill} `,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

module.exports = router;
