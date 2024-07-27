const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//const stripe = new Stripe('YOUR_SECRET_KEY');

module.exports = stripe;