import * as types from "../actions/types";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
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
    console.log(":=============>");
    console.log(results);
    console.log(":=============>");
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

    console.log("=============user credentials====================")
    console.log(userCredential.user.uid)
    console.log("=============user credentials====================")
     
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
    console.log("===============error ==================================")
     console.error('Error Occurred:', JSON.stringify(error));
    console.log("================error=================================")
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
    console.error('Error Occurred:', error);
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

    return response.json();
  } catch (error) {
    console.error('FCM Error:', error);
    throw error; // Rethrow the error to handle it outside this function if needed.
  }
}
