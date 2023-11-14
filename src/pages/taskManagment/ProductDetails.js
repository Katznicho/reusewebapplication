import React from 'react';
import Widget from "../../components/social-feed/widget";
import Details from './producttabs/Details';
import ProductPayment from './producttabs/Payments';
import { UnderlinedTabs } from '../../components/tabs';
import ProductDelivery from './producttabs/Delivery';


function ProductDetails() {

  const tabs = [
    {
      index: 0, title: 'Details', active: true, content:
        <Details />
    },
    {
      index: 1, title: 'Payments', active: false, content: <ProductPayment />
    },
    { index: 2, title: 'Delivery Details', active: false, content: <ProductDelivery /> }
  ]



  return (<Widget

  >
    <div className="flex flex-wrap">
      <div className="w-full">
        <UnderlinedTabs tabs={tabs} />
      </div>
    </div>
  </Widget>)


}

export default ProductDetails
