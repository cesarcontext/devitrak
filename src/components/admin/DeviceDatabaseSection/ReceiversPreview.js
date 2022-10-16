import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAdminStore } from '../../../hooks/useAdminStore';

export const ReceiversPreview = () => {
    const { paymentIntentDetailSelected, paymentIntentReceiversAssigned } =
    useSelector((state) => state.stripe);
    const { checkReceiversAssignedToPaymentIntent } = useAdminStore();
    const [loading, setLoading] = useState(true);

    const paymentToCheck = paymentIntentDetailSelected.paymentIntent;

    useEffect(() => {
        checkReceiversAssignedToPaymentIntent(paymentToCheck);
      }, [paymentIntentDetailSelected.paymentIntent]);
    
      useEffect(() => {
        if (paymentIntentReceiversAssigned !== undefined) {
          setLoading(false);
        }
        if( paymentIntentReceiversAssigned.length < 1){
            setLoading(false)
        }
        return;
        setLoading(true);
      }, [paymentIntentDetailSelected.paymentIntent]);
    
      
  return (
    <div>
        {loading !== true ? paymentIntentReceiversAssigned.at(-1).device?.map( receiver => receiver) : <h6>Loading...</h6>}
    </div>
  )
}
