import React from "react";
import {
  FiHome,
  FiLifeBuoy,
  FiAlertTriangle,
  FiBell,
  FiAirplay,
} from "react-icons/fi";

const initialState = [
  {
    title: "Dashboard",
    items: [
      {
        url: "/dashboard",
        icon: <FiHome size={20} />,
        title: "Dashboard",
        items: [],
      },
      {
        url: "/admins",
        icon: <FiAirplay size={20} />,
        title: "Admins",
        items: [],
      },
      {
        url: "/users",
        icon: <FiLifeBuoy size={20} />,
        title: "Users",
        items: [],
      },

      {
        url: "/donors",
        icon: <FiAlertTriangle size={20} />,
        title: "Donors",
        items: [],
      },
      {
        url: "/community",
        icon: <FiAlertTriangle size={20} />,
        title: "Community",
        items: [],
      },
      {
        url: "/products",
        icon: <FiAlertTriangle size={20} />,
        title: "Products",
        items: [
          {
            url: "/products",
            icon: <FiAlertTriangle size={20} />,
            title: "Products",
            items: [],
          },
          
        ],
      },
      {
        url: "/payments",
        icon: <FiAirplay size={20} />,
        title: "Payments",
        items: [],
      },
      {
        url: "/notifications",
        icon: <FiBell size={20} />,
        title: "Notifications",
        items: [],
      },
      
    ],
  },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
