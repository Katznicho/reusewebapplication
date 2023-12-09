import React, { useState, useEffect } from 'react'
import Widget from '../../../components/widget'
import { FiCheck } from 'react-icons/fi'
import { Card, Input, Modal, Profile, Section, User } from '../../../components'
import { CustomToolbarExample } from '../../../components/text-editor'
import { PRODUCT_STATUSES } from '../../../utils/constants'
import { useHistory, useParams } from 'react-router-dom'
import { getCategoryById, getProductById, getUserById, sendPushNotification, storeNotification, updateProductStatus } from '../../../actions/firebaseAction'

function Details() {

  const [productDetails, setProductDetails] = useState({});
  const [categories, setCategories] = useState('');
  const [users, setUsers] = useState({});
  const [community, setCommunity] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [reason, setReason] = useState('');
  const [isOpenAcceptDialog, setIsOpenAcceptDialog] = useState(false);
  const [isOpenRejectDialog, setIsOpenRejectDialog] = useState(false);

  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  let params = useParams();

  const history = useHistory();

  const navigateToPayment = () => {
    history.push(`/productpaymentstatus/${params.id}`);
  }

  const handleOpenAcceptDialog = () => {
    setIsOpenAcceptDialog(true);
  };

  const handleOpenRejectDialog = () => {
    setIsOpenRejectDialog(true);
  };

  const handleCloseAcceptDialog = () => {
    setIsOpenAcceptDialog(false);
  };

  const handleCloseRejectDialog = () => {
    setIsOpenRejectDialog(false);
  };


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


  const onAcceptProduct = () => {


    try {

      if (!reason) {
        alert("Please add a reason");
        return;
      }

      if (!totalAmount) {
        alert("Please add total amount");
        return;
      }
      setLoadingAccept(true);
      //update product status to accepted

      const title = `${productDetails?.data?.title} Accepted`;
      const message = `Hello ${users?.data?.firstName} ${users?.data?.lastName} your product has been accepted please check the app for more details`;
      const token = users?.data?.deviceId;



      updateProductStatus(productDetails?.id, PRODUCT_STATUSES.ACCEPTED, totalAmount, reason);

      if (token) {
        sendPushNotification(title, message, token);
      }

      //store notification

      // Call the storeNotification function with the notification data
      const notificationData = {
        // Add your notification data here,
        description: `Hello ${users?.data?.firstName} ${users?.data?.lastName} your product has been accepted please check the app for more details`,
        status: PRODUCT_STATUSES.ACCEPTED,
        unRead: true,
        title: `${productDetails?.data?.title} Accepted`,
        userId: productDetails?.data?.userId
      };

      storeNotification(notificationData);

      //close dialog
      handleCloseAcceptDialog();
      setLoadingAccept(false);


      alert("Product Accepted");

      //reload page
      // window.location.reload();


      //navigate  to all products
      // navigate('/products/all');
    }
    catch (error) {
      alert("Something went wrong");
    }
  };


  const onRejectProduct = () => {
    setLoadingReject(true);
    const title = `${productDetails?.data?.title} Rejected`;
    const message = `Hello ${users?.data?.firstName} ${users?.data?.lastName} your product has been rejected please check the app for more details`;
    const token = users?.data?.deviceId;
    updateProductStatus(productDetails?.id, PRODUCT_STATUSES.REJECTED, totalAmount, reason);
    if (token) {
      sendPushNotification(title, message, token);
    }
    //store notification
    const notificationData = {
      description: `Hello ${users?.data?.firstName} ${users?.data?.lastName} your product has been rejected please check the app for more details`,
      status: PRODUCT_STATUSES.REJECTED,
      unRead: true,
      title: `${productDetails?.data?.title} Rejected`,
      userId: productDetails?.data?.userId
    };

    storeNotification(notificationData);
    //close dialog
    handleCloseRejectDialog();
    setLoadingReject(false);

    alert("Product Rejected");

    //reload page
    window.location.reload();
  };

  return (
    <Widget>
      <div
        className={`mt-4 w-full p-4 rounded-lg ${loading
          ? " border border-green-100"
          : " border border-red-100"
          } dark:bg-grey-895 dark:border-grey-890`}
      >
        {/* modal */}
        <Modal
          title={"Accept Product"}
          open={isOpenAcceptDialog}
          setOpen={setIsOpenAcceptDialog}

          icon={
            <span className="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
              <FiCheck size={18} className="stroke-current text-green-500" />
            </span>
          }
          children={
            <div className='w-full space-y-6 bg-white px-4 py-5 sm:p-6'>

              <Input
                title="Total Price"
                placeholder="enter total amount"
                type="number"
                name="totalAmount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}

                width="w-full my-4"
              />

              {/* reason */}
              <label className="block text-sm font-medium text-gray-700">
                Reason
              </label>
              <CustomToolbarExample
                value={reason}
                // onChange={setReason}
                setValue={setReason}
              />

              {/* reason */}

              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">

                <button
                  onClick={onAcceptProduct}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 mx-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Finish
                </button>

                <button
                  onClick={handleCloseAcceptDialog}
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>

              </div>

            </div>
          }


        />
        {/* reject product */}
        <Modal
          title={"Reject Product"}
          open={isOpenRejectDialog}
          setOpen={setIsOpenRejectDialog}
          handleSubmit={() => {

          }}
          icon={
            <span className="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
              <FiCheck size={18} className="stroke-current text-green-500" />
            </span>
          }
          children={
            <div className='w-full space-y-6 bg-white px-4 py-5 sm:p-6'>


              {/* reason */}
              {/* reason */}
              <label className="block text-sm font-medium text-gray-700">
                Reason
              </label>
              <CustomToolbarExample
                value={reason}
                // onChange={setReason}
                setValue={setReason}
              />

              {/* reason */}

              {/* reason */}

              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">

                <button
                  onClick={onRejectProduct}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 mx-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Finish
                </button>

                <button
                  onClick={handleCloseRejectDialog}
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>

              </div>

            </div>
          }


        />
        {/* reject product */}
        {/* modal */}
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
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.title}
                      </div>
                    </div>
                  </div>

                  <div className="w-full col-span-3 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {categories?.data?.name}
                      </div>
                    </div>
                  </div>


                  <div className="w-full col-span-3 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.price ?? 'No Price'}
                      </div>
                    </div>
                  </div>

                  <div className="w-full col-span-3 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Total Amount
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.totalAmount ?? 'No total amount'}
                      </div>
                    </div>
                  </div>

                  <div className="w-full col-span-3 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Receiver Community
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {community?.data?.communityName ?? 'No Community'}
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
                      Description
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.description}
                      </div>
                    </div>
                  </div>

                  {/* weight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Weight
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.estimatedWeight}
                      </div>
                    </div>
                  </div>
                  {/* weight */}


                  {/* weight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pick Up Location
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.estimatedPickUp}
                      </div>
                    </div>
                  </div>
                  {/* weight */}

                  {/* product free */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Is Product Free
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.isFree ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                  {/* product free */}


                  {/* product free */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      is ProductAvailable For All
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.isProductAvailableForAll ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                  {/* product free */}


                  {/* product free covered */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Is Product Delivery Fee Covered
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.isDeliveryFeeCovered ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                  {/* product free covered */}

                  {/* product damaged */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Is Product Product damaged
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {productDetails?.data?.isProductDamaged ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                  {/* product damaged */}

                  <div className="flex flex-col gap-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Owner Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <User
                        image={users?.data?.photoURL}
                        styles="h-3/6 w-3/6"
                        title={`${users?.data?.firstName} ${users?.data?.lastName}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Owner Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm w-full">
                        <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          {users?.data?.firstName} {users?.data?.lastName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">




                  {
                    PRODUCT_STATUSES.ACCEPTED !== productDetails?.data?.status && (
                      <button
                        onClick={handleOpenAcceptDialog}
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 mx-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Accept Product
                      </button>
                    )
                  }

                  {
                    PRODUCT_STATUSES.ACCEPTED == productDetails?.data?.status && (
                      (<button
                        onClick={navigateToPayment}
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 mx-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        View Payments
                      </button>)
                    )
                  }




                  <button
                    onClick={handleOpenRejectDialog}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Reject Product
                  </button>

                </div>
              </div>
            </div>
          </Profile>
        </Section>
      </div>
    </Widget>
  )
}

export default Details
