/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const stripe = require('stripe')('sk_test_51MBmbKKEQZnOTK3DkJ9kd4xmMSBldLb2aPXhJzmKuIkiL9dGWCka6JezH1dRHDJS5sOKr0VlsW3pWVo8DX4emhT8002KxkxVKj');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  const event = req.body; // Get the event from the request body.

  if (event.type === 'checkout.session.completed' || event.type === 'customer.subscription.updated') {
    const customerId = event.data.object.customer;
    const customer = await stripe.customers.retrieve(customerId);
    
    if (customer.metadata && customer.metadata.firebaseUID) {
      const firebaseUID = customer.metadata.firebaseUID;
      
      // Retrieve the subscription & product.
      const subscriptionId = event.data.object.subscription;
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['default_payment_method', 'items.data.price.product'],
      });

      const product = subscription.items.data[0].price.product;
      
      // Make sure the product has firebaseRole metadata.
      if (product.metadata && product.metadata.firebaseRole) {
        const role = product.metadata.firebaseRole;
        
        // Set the custom claim stripeRole.
        await admin.auth().setCustomUserClaims(firebaseUID, { stripeRole: role });
        console.log(`Custom claim added for user ${firebaseUID} with role ${role}`);
      } else {
        console.log('No custom role found in product metadata.');
      }
    } else {
      console.log('No firebaseUID found in customer metadata.');
    }
  }

  res.sendStatus(200); // Send a response that tells Stripe we've received the event.
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
