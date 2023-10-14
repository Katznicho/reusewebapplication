export default function config(
  state = {
    name: "Reuse",
    description: "The Reuse Application",
    url: "#",
    layout: "layout-1",
    collapsed: false,
    rightSidebar: false,
    backdrop: false,
  },
  action
) {
  switch (action.type) {
    case "SET_CONFIG":
      return {
        ...state,
        ...action.config,
      };
    case "SET_CONFIG_KEY":
      let { key, value } = { ...action };
      return {
        ...state,
        [`${key}`]: value,
      };
    default:
      return state;
  }
}
