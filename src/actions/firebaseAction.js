import * as types from "../actions/types";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";

//get_user_data
export const get_user_data = (userId) => async (dispatch) => {

  dispatch({
    type: types.GET_USER_DATA_LOADING,
  });
  try {
    const colRef = doc(db, "users", userId);
    const results = await getDoc(colRef);

    dispatch({
      type: types.GET_USER_DATA_SUCCESS,
      payload: "this is working",
    });
  } catch (error) {
    dispatch({
      type: types.GET_USER_DATA_FAIL,
      payload: error,
    });
  }
};

//uploading blog image
export const upload_blog_image = (image) => async (dispatch) => {
  const storage = getStorage();
  const name = new Date().getTime() + image.name;
  const storageRef = ref(storage, `blogs/${name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      dispatch({
        type: types.UPLOAD_BLOG_LOADING,
      });
    },
    (error) => {
      dispatch({
        type: types.UPLOAD_BLOG_FAIL,
        payload: error,
      });
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      dispatch({
        type: types.UPLOAD_BLOG_SUCCESS,
        payload: url,
      });
    }
  );
};

//create blog
export const create_blog =
  (description, image, currentUser) => async (dispatch) => {
    dispatch({
      type: types.CREATE_BLOG_LOADING,
    });
    const blog = collection(db, "blogs");
    try {
      await addDoc(blog, {
        name: currentUser?.data.firstName + " " + currentUser?.data.lastName,
        photoURL: currentUser?.data.photoURL,
        description,
        image,
        createdAt: new Date().getTime(),
      });

      dispatch({
        type: types.CREATE_BLOG_SUCCESS,
        payload: "Successful Creation",
      });
      dispatch(createMessage("Blog was created successfully", "blog"));
    } catch (error) {
      dispatch({
        type: types.CREATE_BLOG_FAIL,
        payload: error,
      });
    }
  };

//getting blogs
export const get_blogs = () => async (dispatch) => {
  dispatch({
    type: types.GET_BLOG_LOADING,
  });
  const querySnapshot = collection(db, "blogs");
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });
    dispatch({
      type: types.GET_BLOG_SUCCESS,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: types.GET_BLOG_FAIL,
      payload: error,
    });
  }
};

//get payments
export const get_payments = () => async (dispatch) => {
  dispatch({
    type: types.GET_PAYMENTS_LOADING,
  });
  const querySnapshot = collection(db, "payments");
  try {
    const querySnapshot = await getDocs(collection(db, "payments"));
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });
    dispatch({
      type: types.GET_PAYMENTS_SUCCESS,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: types.GET_PAYMENTS_FAIL,
      payload: error,
    });
  }
};

//get notifications
export const get_notifications = () => async () => {

  try {
    const querySnapshot = await getDocs(collection(db, "notifications"));
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });
    return results;

  } catch (error) {

  }
};

export const get_users = () => async (dispatch) => {
  dispatch({
    type: types.GET_USERS_LOADING,
  });
  const querySnapshot = collection(db, "users");
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });
    dispatch({
      type: types.GET_USERS_SUCCESS,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: types.GET_USERS_FAIL,
      payload: error,
    });
  }
};
//verify user
export const verify_user = (userId) => async (dispatch) => {
  dispatch({
    type: types.VERIFY_USER_LOADING,
  });
  const unVerifiedUser = doc(db, "users", userId);
  try {
    await updateDoc(unVerifiedUser, {
      isIDVerified: true,
      isVerified: true,
      isDocumentVerified: true,
    });
    dispatch({
      type: types.VERIFY_USER_SUCCESS,
      payload: "User Verified Successsfully",
    });
    dispatch(createMessage("This user is successfully verified", "verified"));
  } catch (error) {
    dispatch({
      type: types.VERIFY_USER_FAIL,
      payload: error,
    });
  }
};

//make admin
export const make_admin = (userId) => async (dispatch) => {
  dispatch({
    type: types.MAKE_USER_ADMIN_LOADING,
  });
  const admin = doc(db, "users", userId);
  try {
    await updateDoc(admin, {
      isAdmin: true,
    });
    dispatch({
      type: types.MAKE_USER_ADMIN_SUCCESS,
      payload: "User is admin",
    });
    dispatch(createMessage("This user is successfully now an admin", "admin"));
  } catch (error) {
    dispatch({
      type: types.MAKE_USER_ADMIN_FAIL,
      payload: error,
    });
  }
};

//add amount
export const add_amount = (userId, doctorAmount) => async (dispatch) => {
  dispatch({
    type: types.ADD_AMOUNT_LOADING,
  });
  const admin = doc(db, "users", userId);
  try {
    await updateDoc(admin, {
      amount: doctorAmount,
    });
    dispatch({
      type: types.ADD_AMOUNT_SUCCESS,
      payload: "Doctor's Amount set",
    });
    dispatch(createMessage("The doctor's amount is set", "doctor_amount"));
  } catch (error) {
    dispatch({
      type: types.ADD_AMOUNT_FAIL,
      payload: error,
    });
  }
};

//remove admin
export const remove_admin = (userId) => async (dispatch) => {
  dispatch({
    type: types.REMOVE_USER_ADMIN_LOADING,
  });
  const admin = doc(db, "users", userId);
  try {
    await updateDoc(admin, {
      isAdmin: false,
    });
    dispatch({
      type: types.REMOVE_USER_ADMIN_SUCCESS,
      payload: "User not admin",
    });
    dispatch(
      createMessage("This user is successfully no longer an admin", "not-admin")
    );
  } catch (error) {
    dispatch({
      type: types.REMOVE_USER_ADMIN_FAIL,
      payload: error,
    });
  }
};

export const un_verify_user = (userId) => async (dispatch) => {
  dispatch({
    type: types.UN_VERIFY_USER_LOADING,
  });
  const unVerifiedUser = doc(db, "users", userId);

  try {
    await updateDoc(unVerifiedUser, {
      isIDVerified: false,
      isVerified: false,
      isDocumentVerified: false,
    });
    dispatch({
      type: types.UN_VERIFY_USER_SUCCESS,
      payload: "User UnVerified Successsfully",
    });
    dispatch(
      createMessage("This user is successfully unverified", "un_verified")
    );
  } catch (error) {
    dispatch({
      type: types.UN_VERIFY_USER_FAIL,
      payload: error,
    });
  }
};

export const user_login = (loginValues) => async (dispatch) => {
  const { email, password } = loginValues;
  dispatch({
    type: types.LOGIN_LOADING,
  });
  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );



    const data = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      token: userCredential.user.accessToken,
    };
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {

    dispatch({
      type: types.LOGIN_FAIL,
      payload: error.FirebaseError,
    });
    dispatch(
      createMessage(
        "Incorrect Credentials, please enter correct password and email",
        "credentials"
      )
    );
  }
};

export const current_user = () => async (dispatch) => {
  const auth = getAuth();
  dispatch({
    type: types.CURRENT_USER_LOADING,
  });

  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch({
          type: types.CURRENT_USER_SUCCESS,
          payload: uid,
        });
      }
    });
  } catch (error) {
    dispatch({
      type: types.CURRENT_USER_FAIL,
      payload: error,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: types.LOGOUT_SUCCESS,
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_ERRORS_LOADING,
  });
  dispatch({
    type: types.CLEAR_ERRORS_SUCCESS,
  });
};

export const createMessage = (msg, reason) => (dispatch) => {
  dispatch({
    type: types.CREATE_MESSAGES_LOADING,
  });
  dispatch({
    type: types.CREATE_MESSAGES_SUCCESS,
    payload: msg,
    reason: reason,
  });
};

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_MESSAGES_LOADING,
  });
  dispatch({
    type: types.CLEAR_MESSAGES_SUCCESS,
  });
};

//new products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, data: doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error Occurred:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const storeNotification = async (notificationData) => {
  try {
    await addDoc(collection(db, 'notifications'), {
      ...notificationData,
      createdAt: new Date()
    });
  } catch (error) {
    alert("an error occured while creating a notification")
    console.error('Error Occurred:', JSON.stringify(error));
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

//get all notifications
export const getNotifications = async () => {

  try {
    const querySnapshot = await getDocs(collection(db, 'notifications'));
    const notifications = [];
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, data: doc.data() });
    });
    return notifications;
  } catch (error) {
    console.error('Error Occurred:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
}


export async function sendPushNotification(title, message, token) {
  try {
    const FCM_SERVER_KEY =
      'AAAADAPe2tA:APA91bHkmbEVXkAKGUb1t4aVcLhunI6HWbq2kVqpDvv1TkwYVI1bwjBYpGv1R_pCegJrEHM6isdL5WbH6H-bY0q6clqwwba0ms_0eROXJP-7WMhWmrvMnn0W5egZhiY6Vf0kgJEpfOgr';
    const DEVICE_PUSH_TOKEN =
      'dX8RC0uhTDiLvVoU4zyuJv:APA91bElKR0uxDTig-DIAGcRb1UtxyhdDWJzmvOY9MqiHOUohyCkpr10KmR-SkgRVT2IHd-81VeerNDaUFps1oQJgw6jr8etv8qEIZxvx3APtGrvAWAIcMEp3ZCoenIbJA65tZNEgzgK';

    const notification = {
      to: token,
      collapse_key: 'type_a',
      content_available: true,
      priority: 'high',

      notification: {
        title: title,
        body: message,
        sound: 'default',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
        icon: 'https://firebasestorage.googleapis.com/v0/b/reuse-f0081.appspot.com/o/profile%2Fimages%2FgL7CRcKcIBWAUYTdCjHfJCZfVOQ236fonq.jpg?alt=media&token=b89c5c31-4481-47e9-bc13-92ad91b43fcb&_gl=1*1d0ytu2*_ga*MjAxNDY2MDY5OC4xNjgwNzcyMjky*_ga_CW55HF8NVT*MTY5NzI2NzgwMi40Mi4xLjE2OTcyNzAwMjAuNDAuMC4w'
      },
      data: {
        title: "📧 You've got mail",
        message: 'Hello world! 🌐'
      }
    };

    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${FCM_SERVER_KEY}`
      },
      body: JSON.stringify(notification)
    });
    // alert("token", token)

    return response.json();
  } catch (error) {
    alert('Error sending push notification:', error.message);
    console.error('FCM Error:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
}

//new
export const getUserById = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, data: userDoc.data() };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

//update the product status and total amount pass the id of the product
export const updateProductStatus = async (id, status, totalAmount, reason = '') => {
  try {
    await updateDoc(doc(db, 'products', id), {
      status: status,
      totalAmount: totalAmount,
      reason
    });
  } catch (error) {
    alert('Error updating product status:', error.message);
    console.log("===============================================")
    console.error('Error updating product status:', error);
    console.log("===============================================")

  }
};


//get product payment by id
export const getProductPaymentById = async (paymentId) => {
  try {
    const paymentDoc = await getDoc(doc(db, 'payments', paymentId));
    if (paymentDoc.exists()) {
      return { id: paymentDoc.id, data: paymentDoc.data() };
    } else {
      throw new Error('Payment not found');
    }
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

//get delivery details by id
export const getDeliveryById = async (deliveryId) => {
  try {
    const deliveryDoc = await getDoc(doc(db, 'delivery', deliveryId));
    if (deliveryDoc.exists()) {
      return { id: deliveryDoc.id, data: deliveryDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching delivery:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const updateDelivery = async (deliveryId) => {

  try {
    let res = await updateDoc(doc(db, 'delivery', deliveryId), {
      isProductDelivered: true,
      status: "DELIVERED"
    });

  } catch (error) {
    alert("failed to update delivery")
    console.error('Error updating delivery:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
}

//update product delivery status


//store the deliveru details using the product id as the doc id
export const storeDeliveryDetails = async (productId, deliveryDetails) => {
  try {
    await setDoc(doc(db, 'delivery', productId), deliveryDetails);
  } catch (error) {
    console.error('Error storing delivery details:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

//update the product set isDeliverySet to true
export const updateProductDeliveryStatus = async (productId) => {
  try {
    await updateDoc(doc(db, 'products', productId), {
      isDeliverySet: true,
    });
  } catch (error) {
    console.error('Error updating product delivery status:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};



export const getProductById = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, 'products', productId));
    if (productDoc.exists()) {
      return { id: productDoc.id, data: productDoc.data() };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};


//get all categories
export const getAllCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, data: doc.data() });
    });
    return categories;
  } catch (error) {
    console.error('Error Occurred:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

//get category by id
export const getCategoryById = async (categoryId) => {
  try {
    const categoryDoc = await getDoc(doc(db, 'categories', categoryId));
    if (categoryDoc.exists()) {
      return { id: categoryDoc.id, data: categoryDoc.data() };
    } else {
      throw new Error('Category not found');
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const getTotalProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.size;
  } catch (error) {
    console.error('Error Occurred:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const getTotalUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.size;
  } catch (error) {
    console.error('Error Occurred:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};


export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error('Sign-In Error:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};

export const signUserOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign-Out Error:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
};
//new

