import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';
import { getProductById, getUserById, getProductPaymentById, storeDeliveryDetails } from '../../../actions/firebaseAction';
import { Alert, Input, Modal } from '../../../components';
import { convertFirebaseTimestampToReadableDate } from '../../../utils/helpers';
import { PRODUCT_STATUSES } from '../../../utils/constants';
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import { CustomToolbarExample } from '../../../components/text-editor';

function ProductPayment() {

    const [productDetails, setProductDetails] = useState({});
    const [paymentDetails, setPaymentDetails] = useState(null);

    const [users, setUsers] = useState({});
    const [community, setCommunity] = useState({});
    const [loading, setLoading] = useState(false);
    const [reason, setReason] = useState('');
    const [isOpenAcceptDialog, setIsOpenAcceptDialog] = useState(false);
    const [isOpenRejectDialog, setIsOpenRejectDialog] = useState(false);

    const [pickUpDate, setPickUpDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    const [loadingAccept, setLoadingAccept] = useState(false);
    const [loadingReject, setLoadingReject] = useState(false);





    let params = useParams();

    const history = useHistory();



    const handleOpenAcceptDialog = () => {
        setIsOpenAcceptDialog(true);
    };


    const handleCloseAcceptDialog = () => {
        setIsOpenAcceptDialog(false);
    };




    useEffect(async () => {
        try {
            setLoading(true);
            const productDetails = await getProductById(params.id);
            setProductDetails(productDetails);
            if (productDetails) {
                const user = await getUserById(productDetails?.data?.userId);

                setUsers(user);
                const community = await getUserById(productDetails?.data?.receiverCommunity);

                setCommunity(community);
            }
            if (productDetails?.data?.paymentId) {
                const paymentDetails = await getProductPaymentById(productDetails?.data?.paymentId);

                setPaymentDetails(paymentDetails);
            }
            else {
            }

        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, []);

    const onCreateDeliveryDetails = () => {
        if (!pickUpDate) {
            alert("Please select pick up date");
            return;
        }
        if (!deliveryDate) {
            alert("Please select delivery date");
            return;
        }
        const data = {
            pickUpDate,
            deliveryDate,
            status: PRODUCT_STATUSES.PENDING,
            productId: params.id,
            isProductDelivered: false,
            reason,
            createdAt: new Date(),
        }
        storeDeliveryDetails(params.id, data);
        handleCloseAcceptDialog();
        alert("Delivery details created successfully");

    }


    return (
        <>
            <SectionTitle title="Payment" subtitle="Product Payment" />
            <Widget title="Product Payment" description={<span>Page Details Payment</span>}>

                {/* delivery details modal */}
                <Modal
                    title={"Delivery Details"}
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
                                title="Pick Up Date"
                                placeholder="enter pick up date"
                                type="date"
                                name="pickUpDate"
                                value={pickUpDate}
                                onChange={(e) => setPickUpDate(e.target.value)}

                                width="w-full my-4"
                            />

                            <Input
                                title="Delivery Date"
                                placeholder="enter delivery date"
                                type="date"
                                name="deliveryDate"
                                value={pickUpDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}

                                width="w-full my-4"
                            />

                            {/* reason */}
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <CustomToolbarExample
                                value={reason}
                                // onChange={setReason}
                                setValue={setReason}
                            />

                            {/* reason */}

                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">

                                <button
                                    onClick={onCreateDeliveryDetails}
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
                {/* delivery details modal */}
                <div className="w-full mt-5 md:col-span-2 md:mt-0">
                    <div className="w-full shadow sm:overflow-hidden sm:rounded-md">
                        <div className="w-full space-y-6 bg-white px-4 py-5 sm:p-6">
                            {
                                paymentDetails == null ? <div>No Payment</div> :
                                    <div>
                                        <div className="w-full col-span-3 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Total Amount
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                                <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    {paymentDetails?.data?.totalAmount}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full col-span-3 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Payment Method
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                                <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    {paymentDetails?.data?.paymentMethod}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full col-span-3 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Payment Status
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                                <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    {paymentDetails?.data?.status}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full col-span-3 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Transaction Reference
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                                <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    {paymentDetails?.data?.transactionRef}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full col-span-3 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Paid To
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                                <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    {paymentDetails?.data?.paidTo}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full col-span-3 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Paid On
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                                <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    {convertFirebaseTimestampToReadableDate(paymentDetails?.data?.createdAt)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full col-span-3 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Paid By
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                                <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    {users?.data?.firstName} {users?.data?.lastName}
                                                </div>
                                            </div>
                                        </div>

                                        {/* button section */}
                                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            {
                                                PRODUCT_STATUSES.ACCEPTED == productDetails?.data?.status && !productDetails?.data?.isDeliveryNotSet && (
                                                    <button
                                                        onClick={handleOpenAcceptDialog}
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 mx-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Set Delivery Details
                                                    </button>
                                                )
                                            }
                                        </div>
                                        {/* button section */}


                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </Widget>
        </>
    )
}

export default ProductPayment
