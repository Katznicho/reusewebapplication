import React from "react";

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
import {
  clearMessage,
  un_verify_user,
  verify_user,
} from "../../actions/firebaseAction";
import { useDispatch, useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";


const VerifyPage = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const itemId = location?.state;

  const { firebase } = useSelector((state) => ({
    firebase: state.firebase,
  }));

  const { users, verify_loading, message, reason } = {
    ...firebase,
  };

  const singleUser = users.find((user) => (itemId ? user.id === itemId : null));
  console.log(singleUser?.data);
  console.log(singleUser?.data.verified);

  const handleModalPopup = () => {
    setOpen(!open);
  };

  return (
    <Widget>
      <div
        className={`mt-4 w-full p-4 rounded-lg ${
          singleUser?.data.verified
            ? " border border-green-100"
            : " border border-red-100"
        } dark:bg-grey-895 dark:border-grey-890`}
      >
        {message && reason === "verified" ? (
          <div className="w-full mb-4">
            {(message !== null || message !== undefined) && (
              <Alert
                error={`text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800`}
                icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
                onClick={() => dispatch(clearMessage())}
              >
                {message}
              </Alert>
            )}
          </div>
        ) : null}
        {message && reason === "un_verified" ? (
          <div className="w-full mb-4">
            {(message !== null || message !== undefined) && (
              <Alert
                error={`text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800`}
                icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
                onClick={() => dispatch(clearMessage())}
              >
                {message}
              </Alert>
            )}
          </div>
        ) : null}
        <Section
          title="Verifing Documents"
          description="Verify user documents"
          documentData={
            <div className="cursor-pointer">
              <a href={singleUser?.data.doctorDocument}>View Documents</a>
            </div>
          }
        >
          <Profile>
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0 flex flex-col gap-y-8">
                <h3 className="leading-6 text-gray-900 text-xl font-bold">
                  {singleUser?.data.firstName + " " + singleUser?.data.lastName}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Private information{" "}
                  {singleUser?.data.firstName + " " + singleUser?.data.lastName}{" "}
                  that need to be looked into for verification
                </p>
                <div>
                  <div>
                    <p className="text-sm font-bold">NationalID Front</p>
                  </div>
                  <Card>
                    <img
                      src={singleUser?.data.idFrontPicture}
                      alt="National ID front picture"
                    />
                  </Card>
                </div>
                <div>
                  <div>
                    <p className="text-sm font-bold">NationalID Back</p>
                  </div>
                  <Card>
                    <img
                      src={singleUser?.data.idBackPicture}
                      alt="National ID back picture"
                    />
                  </Card>
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
                        {singleUser?.data.email}
                      </div>
                    </div>
                  </div>
                  <div className="w-full col-span-3 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {singleUser?.data.role}
                      </div>
                    </div>
                  </div>

                  <div className="w-full col-span-3 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Dob
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {singleUser?.data.dob}
                      </div>
                    </div>
                  </div>
                  <div className="w-full col-span-3 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {singleUser?.data.status}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm w-full">
                      <div className="inline-flex items-center p-4 w-full rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {singleUser?.data.isAdmin}
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
                        image={singleUser?.data.photoURL}
                        styles="h-3/6 w-3/6"
                        title="Dp"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  {singleUser?.data.isVerified ? (
                    <button
                      onClick={() => {
                        dispatch(un_verify_user(itemId));
                      }}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {verify_loading ? <Loader /> : "Unverify"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (singleUser?.data.role === "user") {
                          dispatch(verify_user(itemId));
                        } else {
                          dispatch(verify_user(itemId));
                        }
                      }}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {verify_loading ? <Loader /> : "verify"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Profile>
        </Section>
      </div>
    </Widget>
  );
};
export default VerifyPage;
