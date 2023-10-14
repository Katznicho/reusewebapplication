import {
    getDocs,
    collection,
    doc,
    getDoc,
    updateDoc,
    addDoc
  } from 'firebase/firestore';
  import { auth, db } from './config';
  import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
  
  export const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, data: doc.data() });
      });
      return users;
    } catch (error) {
      console.error('Error Occurred:', error);
      throw error; // Rethrow the error to handle it outside this function if needed.
    }
  };
  
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
  
  //
  
  //updata the product status and total amount pass the id of the product
  export const updateProductStatus = async (id, status, totalAmount, reason = '') => {
    try {
      await updateDoc(doc(db, 'products', id), {
        status: status,
        totalAmount: totalAmount,
        reason
      });
    } catch (error) {}
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
  
  // export const getAcceptedProducts = async () => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       query(collection(db, 'products'), where('status', '==', 'accepted'))
  //     );
  //     const acceptedProducts = [];
  //     querySnapshot.forEach((doc) => {
  //       acceptedProducts.push({ id: doc.id, data: doc.data() });
  //     });
  //     return acceptedProducts;
  //   } catch (error) {
  //     console.error('Error Occurred:', error);
  //     throw error; // Rethrow the error to handle it outside this function if needed.
  //   }
  // };
  
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
  
  //get all
  
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
  