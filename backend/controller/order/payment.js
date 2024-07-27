const stripe = require('../../config/stripe');
const userModel = require("../../models/userModel");

/***
 * cartItems [
  {
    _id: '66a2599d29944a0f02dde459',
    productId: {
      _id: '6693cdf37eca9526028ba150',
      productName: 'airpodes',
      brandName: 'boAt Airdopes 111 3',
      category: 'Airprodes',
      productImage: [Array],
      description: 'boAt Airdopes 111@2024',
      price: 120,
      sellingPrice: 65,
      createdAt: '2024-07-12T16:02:41.766Z',
      updatedAt: '2024-07-12T16:02:41.766Z',
      __v: 0
    },
    quantity: 1,
    userId: '668f0d7d3797263a32bcf04f',
    createdAt: '2024-07-25T13:56:45.174Z',
    updatedAt: '2024-07-25T13:56:45.174Z',
    __v: 0
  }
]
 */
        
const paymentController = async(request, response) => {
    try{
        const { cartItems } = request.body;

        //console.log("cartItems", cartItems);  // result is up

        const user = await userModel.findOne({ _id : request.userId });

        //console.log("customer_email", user?.email);  // customer_email nimerelsayed@hotmail.com

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection : 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1PgRpPFnCLn2pXyLGxOUTn5U'
                }
            ],
            customer_email: user.email,
            metadata: {
                userId: request.userId
                //userId: user?._id
            },
            line_items: cartItems.map((item,index) => {
                return {
                price_data: {
                    currency: 'usd', // {message: 'The default currency of your line items (`inr`) mu…e default currency of your shipping rate (`usd`).', error: true, success: false}
                    product_data: {
                        name: item.productId.productName,
                        images: item.productId.productImage, //[item.image]
                        metadata : {
                            productId: item.productId._id,
                        }
                    },
                    unit_amount: item.productId.sellingPrice * 100,
                    //unit_amount: item.productId.sellingPrice,
                },
                adjustable_quantity : {
                    enabled: true, // item.quantity > 1
                    minimum: 1, // minimum_quantity
                    //maximum_quantity: item.productId.stock,
                },
                quantity: item.quantity,
            }
        }),
           
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }

        const session = await stripe.checkout.sessions.create(params);

        response.status(300).json(session);

    } catch (err){
        return response.status(400).json({ 
           message : err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = paymentController;