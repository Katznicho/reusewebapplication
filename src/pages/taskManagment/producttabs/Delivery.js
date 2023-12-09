import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';
import { getProductById, getUserById, getDeliveryById, updateProductDeliveryStatus, updateProductStatus, sendPushNotification, storeNotification, updateDelivery } from '../../../actions/firebaseAction';
import { PRODUCT_STATUSES } from '../../../utils/constants';

function ProductDelivery() {
    const [productDetails, setProductDetails] = useState({});
    const [categories, setCategories] = useState('');
    const [users, setUsers] = useState({});
    const [community, setCommunity] = useState({});
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [reason, setReason] = useState('');
    const [isOpenAcceptDialog, setIsOpenAcceptDialog] = useState(false);
    const [isOpenRejectDialog, setIsOpenRejectDialog] = useState(false);

    const [deliveryDetails, setDeliveryDetails] = useState(null);



    let params = useParams();

    const history = useHistory();



    const handleOpenAcceptDialog = () => {
        setIsOpenAcceptDialog(true);
    };

    const handleOpenRejectDialog = () => {
        setIsOpenRejectDialog(true);
    };

    const onDelivered = () => {
        // alert(deliveryDetails.id)

        updateDelivery(deliveryDetails.id);
        // history.push('/taskManagment');
        const title = `${productDetails?.data?.title} Delivered`;
        const message = `Hello ${users?.data?.firstName} ${users?.data?.lastName} your product has been delivered please check the app for more details`;
        const token = users?.data?.deviceId;

        updateProductStatus(productDetails?.id, PRODUCT_STATUSES.DELIVERED, totalAmount, reason);

        if (token) {
            sendPushNotification(title, message, token);
        }
        // // Call the storeNotification function with the notification data
        const notificationData = {
            // Add your notification data here,
            description: `Hello ${users?.data?.firstName} ${users?.data?.lastName} your product has been delivered please check the app for more details`,
            status: PRODUCT_STATUSES.ACCEPTED,
            unRead: true,
            title: `${productDetails?.data?.title} Delivered`,
            userId: productDetails?.data?.userId
        };

        storeNotification(notificationData);
        alert("Product Delivered");
        window.location.reload();
    }




    useEffect(async () => {
        try {
            setLoading(true);
            const productDetails = await getProductById(params.id);
            setProductDetails(productDetails);
            if (productDetails) {
                const delivery = await getDeliveryById(params.id);
                console.log("========deliverey==============")
                console.log(delivery);
                console.log("=====================")
                setDeliveryDetails(delivery);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <>
            <SectionTitle title="Delivery" subtitle="Delivery Details Page" />
            <Widget title="Delivery" description={<span>This page is for delivery details</span>}>
                <div className="w-full mt-5 md:col-span-2 md:mt-0">
                    <div className="w-full shadow sm:overflow-hidden sm:rounded-md">
                        <div className="w-full space-y-6 bg-white px-4 py-5 sm:p-6">
                            {
                                deliveryDetails == null ? <div>
                                    <h1> No Delivery Details...</h1>
                                </div> : <div>
                                    <div className="w-full col-span-3 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Pick Up Date
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm w-full">
                                            <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                {deliveryDetails?.data?.pickUpDate}
                                            </div>
                                        </div>
                                    </div>
                                    {/* delivery date */}
                                    <div className="w-full col-span-3 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Delivery Date
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm w-full">
                                            <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                {deliveryDetails?.data?.deliveryDate}
                                            </div>
                                        </div>
                                    </div>
                                    {/* delivery date */}
                                    {/* is delivery confirmed */}
                                    <div className="w-full col-span-3 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Is Delivery Confirmed
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm w-full">
                                            <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                {deliveryDetails?.data?.isConfirmed ? "Yes" : "No"}
                                            </div>
                                        </div>
                                    </div>
                                    {/* is delivery confirmed */}

                                    {/* delivery status */}
                                    <div className="w-full col-span-3 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Delivery Status
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm w-full">
                                            <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                {deliveryDetails?.data?.status}
                                            </div>
                                        </div>
                                    </div>
                                    {/* delivery status */}

                                    {/* buttons */}
                                    {/* button section */}
                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                        <button
                                            onClick={onDelivered}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 mx-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Update Delivery
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Widget>
        </>
    )
}

export default ProductDelivery
