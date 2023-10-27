import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { getCategoryById, getProductById, getUserById } from '../../actions/firebaseAction';


function ProductDetails() {

    const [productDetails, setProductDetails] = useState({});
    const [categories, setCategories] = useState('');
    const [users, setUsers] = useState({});
    const [community, setCommunity] = useState({});
    const [loading, setLoading] = useState(false);
    let params = useParams();


    useEffect(async () => {
      try {
        setLoading(true);
        const productDetails = await getProductById(params.id);
        setProductDetails(productDetails);
        if (productDetails) {
          const category = await getCategoryById(productDetails?.data?.category);
          
          setCategories(category);
          const user = await getUserById(productDetails?.data?.userId);
          
          setUsers(user);
          const community = await getUserById(productDetails?.data?.receiverCommunity);
        
          setCommunity(community);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }, []);

    console.log("========product details======================")
    console.log(productDetails);
    console.log("=========productd details=====================")


  return (
    <div>
       <p>Product details</p>
    </div>
  )
}

export default ProductDetails
