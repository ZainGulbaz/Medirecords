export const alertAction = (isAlert,message,color) => {
  return {
    type: "ALERT",
    payload: {
      isAlert,
      message,
      color
    },
  };
};
