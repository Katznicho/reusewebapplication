import React, {useEffect, useState} from "react";
import Widget1 from "../../components/dashboard/widget-1";
import Section from "../../components/dashboard/section";
import SectionTitle from "../../components/dashboard/section-title";
import { FiActivity, FiUsers, FiExternalLink, FiClock } from "react-icons/fi";
import Dropdown1 from "../../components/widgets/dropdown-1";
import { Timeline1 } from "../../components/timelines";
import { useDispatch, useSelector } from "react-redux";
import {getNotifications, get_payments, getProducts } from "../../actions/firebaseAction";
import { Loader } from "../../components";
import { Donut1 } from "../../components/dashboard/donut-chart";


const Index = () => {


  const [products , setProducts] = useState([]);
  const [notifications , setNotifications] = useState([]);
  const [loading , setLoading] =  useState(true);

  useEffect(() => {
      setLoading(true);
    getProducts().then((data) => {
      setProducts(data);
    });
    getNotifications().then((data) => {
      setNotifications(data);
    }).catch((error) => {
    })

    setLoading(false);

  }, []);

  useEffect(() => {
    
  }, [notifications, products]);



  const { firebase } = useSelector((state) => ({
    firebase: state.firebase,
  }));
  const {
    users,
    payments,
    get_payments_loading,
  } = {
    ...firebase,
  };

  const doctors = users?.filter((user) =>
    user.data.role === "doctor" ? user : null
  );
  const verifiedUsers = users?.filter((user) =>
    user.data.verified ? user : null
  );

  const unVerifiedUsers = users?.filter((user) =>
    !user.data.verified ? user : null
  );

  const admins = users?.filter((user) => (user.data.isAdmin ? user : null));

  return (
    <>
      <SectionTitle title="Overview" subtitle="Dashboard" />
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        {/*widget*/}
        <div
          className="w-full lg:w-1/4"
          onClick={() => (window.location.href = "/users")}
        >
          <Widget1
            title="Total Users"
            description={users.length}
            color="bg-tunziblue"
            right={
              <FiUsers size={24} className="stroke-current text-grey-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Total Products"
            description={products.length}
            color="bg-blue-600"
            right={
              <FiActivity size={24} className="stroke-current text-grey-500" />
            }
          />
        </div>
        {/*widget*/}
        <div
          className="w-full lg:w-1/4 "
          onClick={() => (window.location.href = "/verify-page")}
        >
          <Widget1
            title="Verified Users"
            description={verifiedUsers.length}
            color="bg-green-600"
            right={
              <FiExternalLink
                size={24}
                className="stroke-current text-grey-500"
              />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Unverified Users"
            description={unVerifiedUsers.length}
            right={
              <FiClock size={24} className="stroke-current text-grey-500" />
            }
            color="bg-red-600"
          />
        </div>
        <div
          className="w-full lg:w-1/4"
          onClick={() => (window.location.href = "/admins")}
        >
          <Widget1
            title="Admins"
            description={admins.length}
            right={
              <FiClock size={24} className="stroke-current text-grey-500" />
            }
            color="bg-yellow-600"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/3">
          <Section
            title="Payments"
            description={<span>This month</span>}
            right={<Dropdown1 />}
          >
            <div className="flex flex-row w-full">
              {get_payments_loading ? (
                <Loader />
              ) : (
                <Donut1 payments={payments} />
              )}
            </div>
          </Section>
        </div>
        <div className="w-full lg:w-1/3">
          <Section
            title="Notifications"
            description={<span>Recent Notifications</span>}
            right={<Dropdown1 />}
          >
            <div className="flex flex-row w-full">
              {loading ? (
                <Loader />
              ) : (notifications.length > 0 &&
                <Timeline1 notifications={notifications} />
              )}
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};
export default Index;
