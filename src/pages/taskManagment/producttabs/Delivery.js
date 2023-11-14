import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';
import { getCategoryById, getProductById, getUserById, getDeliveryById } from '../../../actions/firebaseAction';

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

    return (
        <>
            <SectionTitle title="Pages" subtitle="Empty page" />
            <Widget title="Page title" description={<span>Page description</span>}>
                <p>This is an empty page</p>
            </Widget>
        </>
    )
}

export default ProductDelivery
