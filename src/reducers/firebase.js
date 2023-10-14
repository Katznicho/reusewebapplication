import * as types from "../actions/types";

const initialState = {
  user: null,
  userInfo: null,
  error: null,
  get_firebase_user_loading: false,
  get_firebase_users_loading: false,
  login_loading: false,
  isAuthenticated: false,
  token: localStorage.getItem("user_token"),
  message: null,
  reason: null,
  message_loading: false,
  error_loading: false,
  verify_loading: false,
  un_verify_loading: false,
  users: [],
  image: null,
  uploading: false,
  blogs: [],
  get_blogs_loading: false,
  create_blog_loading: false,
  currentUser: null,
  loading: false,
  admin_loading: false,
  remove_admin_loading: false,
  success: false,
  amount_loading: false,
  payments: [],
  get_payments_loading: false,
  notifications: [],
  get_notifications_loading: false,
};

export default function firebase(state = initialState, action) {
  switch (action.type) {
    //login
    case types.LOGIN_LOADING:
      return {
        ...state,
        login_loading: true,
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem(
        "user_token",
        JSON.stringify(action.payload.token)
      );
      return {
        ...state,
        login_loading: false,
        isAuthenticated: true,
        user: action.payload.uid,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        login_loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    //verifying user
    case types.VERIFY_USER_LOADING:
      return {
        ...state,
        verify_loading: true,
      };
    case types.VERIFY_USER_SUCCESS:
      return {
        ...state,
        verify_loading: false,
      };
    case types.VERIFY_USER_FAIL:
      return {
        ...state,
        verify_loading: false,
        error: action.payload,
      };

    //make admin
    case types.MAKE_USER_ADMIN_LOADING:
      return {
        ...state,
        admin_loading: true,
      };
    case types.MAKE_USER_ADMIN_SUCCESS:
      return {
        ...state,
        admin_loading: false,
      };
    case types.MAKE_USER_ADMIN_FAIL:
      return {
        ...state,
        admin_loading: false,
        error: action.payload,
      };

    //add amount
    case types.ADD_AMOUNT_LOADING:
      return {
        ...state,
        amount_loading: true,
      };
    case types.ADD_AMOUNT_SUCCESS:
      return {
        ...state,
        amount_loading: false,
      };
    case types.ADD_AMOUNT_FAIL:
      return {
        ...state,
        amount_loading: false,
        error: action.payload,
      };

    //remove admin privileges
    case types.REMOVE_USER_ADMIN_LOADING:
      return {
        ...state,
        remove_admin_loading: true,
      };
    case types.REMOVE_USER_ADMIN_SUCCESS:
      return {
        ...state,
        remove_admin_loading: false,
      };
    case types.REMOVE_USER_ADMIN_FAIL:
      return {
        ...state,
        remove_admin_loading: false,
        error: action.payload,
      };

    //get a blog
    case types.GET_BLOG_LOADING:
      return {
        ...state,
        get_blogs_loading: true,
      };
    case types.GET_BLOG_SUCCESS:
      return {
        ...state,
        blogs: action.payload,
        get_blogs_loading: false,
      };
    case types.GET_BLOG_FAIL:
      return {
        ...state,
        get_blogs_loading: false,
        error: action.payload,
      };
    //get payments
    case types.GET_PAYMENTS_LOADING:
      return {
        ...state,
        get_payments_loading: true,
      };
    case types.GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payload,
        get_payments_loading: false,
      };
    case types.GET_PAYMENTS_FAIL:
      return {
        ...state,
        get_payments_loading: false,
        error: action.payload,
      };

    //get notifications
    case types.GET_NOTIFICATIONS_LOADING:
      return {
        ...state,
        get_notifications_loading: true,
      };
    case types.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        get_notifications_loading: false,
      };
    case types.GET_NOTIFICATIONS_FAIL:
      return {
        ...state,
        get_notifications_loading: false,
        error: action.payload,
      };
    //get a current user
    case types.CURRENT_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
      };
    case types.CURRENT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //uploading  image
    case types.UPLOAD_BLOG_LOADING:
      return {
        ...state,
        uploading: true,
      };
    case types.UPLOAD_BLOG_SUCCESS:
      return {
        ...state,
        image: action.payload,
        success: true,
        uploading: false,
      };
    case types.UPLOAD_BLOG_FAIL:
      return {
        ...state,
        uploading: false,
        error: action.payload,
        success: false,
      };
    //create a blog
    case types.CREATE_BLOG_LOADING:
      return {
        ...state,
        create_blog_loading: true,
      };
    case types.CREATE_BLOG_SUCCESS:
      return {
        ...state,
        images: action.payload,
        create_blog_loading: false,
      };
    case types.CREATE_BLOG_FAIL:
      return {
        ...state,
        create_blog_loading: false,
        error: action.payload,
      };

    //un verifying user
    case types.UN_VERIFY_USER_LOADING:
      return {
        ...state,
        un_verify_loading: true,
      };
    case types.UN_VERIFY_USER_SUCCESS:
      return {
        ...state,
        un_verify_loading: false,
      };
    case types.UN_VERIFY_USER_FAIL:
      return {
        ...state,
        un_verify_loading: false,
        error: action.payload,
      };
    // get user data
    case types.GET_USER_DATA_LOADING:
      return {
        ...state,
        get_firebase_user_loading: true,
      };
    case types.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        get_firebase_user_loading: false,
      };
    case types.GET_USER_DATA_FAIL:
      return {
        ...state,
        get_firebase_user_loading: false,
        error: action.payload,
      };
    //get users
    case types.GET_USERS_LOADING:
      return {
        ...state,
        get_firebase_users_loading: true,
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        get_firebase_users_loading: false,
      };
    case types.GET_USERS_FAIL:
      return {
        ...state,
        get_firebase_users_loading: false,
        error: action.payload,
      };
    //logout
    case types.LOGOUT_SUCCESS:
      localStorage.removeItem("user_token");
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    //messages
    case types.CREATE_MESSAGES_SUCCESS:
      return {
        ...state,
        message_loading: false,
        message: action.payload,
        reason: action.reason,
      };

    case types.CLEAR_ERRORS_LOADING:
      return {
        ...state,
        error_loading: true,
      };

    case types.CLEAR_MESSAGES_LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.CLEAR_ERRORS_SUCCESS:
      return {
        ...state,
        error: null,
        error_loading: false,
      };

    case types.CLEAR_MESSAGES_SUCCESS:
      return {
        ...state,
        message_loading: false,
        message: null,
        reason: null,
        get_user_type: null,
      };

    default:
      return state;
  }
}
