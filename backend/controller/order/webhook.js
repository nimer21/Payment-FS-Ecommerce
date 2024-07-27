const stripe = require('../../config/stripe');
const addToCartModel = require('../../models/cartProductModel');
const orderModel = require('../../models/orderProductModel');
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

async function getLineItems(lineItems) {
  let ProductItems = [];
  if(lineItems?.data?.length) {
    //console.log("if(lineItems?.data?.length)",lineItems?.data?.length);
    for(const item of lineItems.data) { //let i=0; i<lineItems.data.length; i++
      //const product = await stripe.products.retrieve(item.price.product_id); Big Error
      const product = await stripe.products.retrieve(item.price.product); //lineItems.data[i].product
      const productId = product.metadata.productId; //

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
        
        /**
         * description: product.description,  
        type: product.type,
        created: product.created,
        metadata: product.metadata,
        images: product.images,
        images_url: product.images.length > 0? product.images[0] : '',
        variants: product.variants?.data || [],
        variants_count: product.variants?.data?.length || 0,
        variants_ids: product.variants?.data?.map(variant => variant.id) || [],
        variants_prices: product.variants?.data?.map(variant => variant.price / 100) || [],
        options: product.options?.data || [],
        options_count: product.options?.data?.length || 0,
        options_ids: product.options?.data?.map
         */
      }
            /*ProductItems.push({
        productId: product.id,
        productName: product.name,
        quantity: lineItems.data[i].quantity,
        price: lineItems.data[i].price / 100
      });*/

      ProductItems.push(productData);
      }
    }
    return ProductItems;
  }

const webhooks = async(request,response) => {
    const sig = request.headers['stripe-signature'];

    const payloadString = JSON.stringify(request.body);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
      });

    let event;

    try {
      event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error *** Nimer ***: ${err.message}`);
      return;
    }

      // Handle the event
  switch (event.type) {
    //payment_intent.created
    //case 'payment_intent.succeeded':
    case 'checkout.session.completed':
      const session = event.data.object;

      //console.log("session",session);
      
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      //console.log("lineItems",lineItems);
      //console.log("totalAmount",session.amount_total/100);

      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails : productDetails,
        email : session.customer_email,
        userId : session.metadata.userId,
        paymentDetails : {
          paymentId : session.payment_intent,
          payment_method_type : session.payment_method_types,
          payment_status : session.payment_status,
        },
        shipping_options : session.shipping_options.map(s=> {
          return {
            ...s,
            shipping_amount : s.shipping_amount / 100
          }
        }),
        totalAmount : session.amount_total / 100,
        /**
         * orderId: session.client_reference_id,
        orderDate: new Date(),
        totalAmount: session.amount_total / 100,
        currency: session.currency,
        customerId: session.customer,
        lineItems: getLineItems(lineItems) */        
      }

      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();
      if (saveOrder?._id) {
        const deleteCartItem = await addToCartModel.deleteMany({ userId : session.metadata.userId })
      }

    
    //const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

    response.status(200).send();
}

module.exports = webhooks;