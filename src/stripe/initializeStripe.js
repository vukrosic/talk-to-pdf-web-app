import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise = null;

const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            "pk_test_51MBmbKKEQZnOTK3DEXb7vNlaQW4kf4dFc5Ck9XL9VlVBXd0p0S6JGRQmnwIb0fG4tOVNuu6D5gZGN67Aqa38Mccv00QeSPG5rN"
        );
    }
    return stripePromise;
};

export default initializeStripe;