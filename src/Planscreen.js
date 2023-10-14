import React, { useEffect, useState } from 'react'
import './Planscreen.css'
import db from './firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function Planscreen() {
    const [products, setProducts] = useState ([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);


    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start
                })
            })
        })
    }, [user.uid])


    useEffect(() => {
        db.collection('products')
        .where('active', '==', true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products)
        });
    }, []);

    console.log(products);
    console.log(subscription);


    const loadCheckout = async (priceId) => {
        const docRef = await db
        .collection('customers')
        .doc(user.uid)
        .collection('checkout_sessions')
        .add({
            price: priceId, 
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                //Showing an error to the customer
                //Inspecting your cloud base function logs in the Firebase console
                alert(`An error occurred: ${error.message}`);
            }

            if (sessionId) {
                // We have a session, let's redirect checkout
                // Init Stripe

                const stripe = await loadStripe('pk_test_51O0oDdK4ktPy7y3hOQGRtgVCNMmDbA1uhZmUXYxx72xPSYjQIaHsfY3dqFhwj7fEVlssQvRWOKzqocvgzBdIRUGO001Lgzrq5p'
                );
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };



  return (
   <div className='planScreen'>
    <br /> 
    {subscription && <p>Renewal date : {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p> }
    {Object.entries(products).map(([productId, productData]) => {
        //adding some logic to check if user subscription is active
        const  isCurrentPackage = productData.name
        ?.toLowerCase()
        .includes(subscription?.role);


        return (
            <div key={productId} className = {`${
                isCurrentPackage && "planScreen__plan--disabled"}
                planScreen__plan`}
            >
                <div className='planScreen__info'>
                    <h5>{productData.name}</h5>
                    <h6>{productData.description}</h6>
                </div>

                <button onClick={() =>
                !isCurrentPackage &&  loadCheckout(productData.prices.priceId)}
                >
                {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                </button>
            </div>
        )
    })}
   </div>
  );
}


export default Planscreen