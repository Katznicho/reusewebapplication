import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { getCategoryById, getProductById, getUserById } from '../../actions/firebaseAction';
import Widget from "../../components/social-feed/widget";
import {
  Alert,
  Card,
  Loader,
  Profile,
  User,
  Section
} from "../../components";
import {  useLocation } from "react-router-dom";


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
    <Widget>
    <div
      className={`mt-4 w-full p-4 rounded-lg ${
        loading
          ? " border border-green-100"
          : " border border-red-100"
      } dark:bg-grey-895 dark:border-grey-890`}
    >
      <Section
        title="Product Details"
        description="Product Details"
        loading={loading}
      >
        <Profile>
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0 flex flex-col gap-y-8">
              <h3 className="leading-6 text-gray-900 text-xl font-bold">
                {productDetails?.data?.title}
              </h3>
              <div>
                <div>
                  <p className="text-sm font-bold">Cover  Image</p>
                </div>
                <Card>
                  <img
                    src={productDetails?.data?.coverImage}
                    alt="cover image"
                
                  />
                </Card>
              </div>
              <div>
                <div>
                  <p className="text-sm font-bold">More Images</p>
                </div>
                {
                  productDetails?.data?.images?.map((picture, index) => (
                    
                    <Section
                       key={index}
                       title={`Image ${index + 1}`}
                       description={`Image ${index + 1}`}
                       documentData={
                        <Card key={index}>
                        <img
                          src={picture}
                          alt="cover image"
                          key={index}
                        />
                      </Card>
                       }
                    />

                  ))
                }
              </div>
            </div>
          </div>
          <div className="w-full mt-5 md:col-span-2 md:mt-0">
            <div className="w-full shadow sm:overflow-hidden sm:rounded-md">
              
              <div className="w-full space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="w-full col-span-3 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm w-full">
                    <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      {productDetails?.data?.email}
                    </div>
                  </div>
                </div>
                <div className="w-full col-span-3 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm w-full">
                    <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      {productDetails?.data?.role}
                    </div>
                  </div>
                </div>

                <div className="w-full col-span-3 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dob
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm w-full">
                    <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      {productDetails?.data?.dob}
                    </div>
                  </div>
                </div>
                <div className="w-full col-span-3 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm w-full">
                    <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      {productDetails?.data?.status}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm w-full">
                    <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      {productDetails?.data?.isAdmin}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for the data.
                  </p>
                </div>

                <div className="flex flex-col gap-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    <User
                      image={productDetails?.data?.photoURL}
                      styles="h-3/6 w-3/6"
                      title="Dp"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                {productDetails?.data?.isVerified ? (
                  <button
                   
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>
          </div>
        </Profile>
      </Section>
    </div>
  </Widget>
  )
}

export default ProductDetails
