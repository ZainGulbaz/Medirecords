const alertReducer = (initialState = { isAlert: null,message:"No message",color:"danger" }, action) => {
  if (action.type === "ALERT") return action.payload;
  else return initialState;
};

export default alertReducer;
