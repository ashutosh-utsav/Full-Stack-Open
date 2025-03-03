const Notification = ({ message }) => {
    const notifStyle = {
      display: "grid",
      placeItems: "center",
      fontSize: 36,
      color: "green",
      fontStyle: "italic",
      backgroundColor: "lightgrey",
      border: "2px dashed green",
      borderRadius: "20px 20px 20px 20px",
    };
  
    if (message === null) {
      return null;
    }
  
    return <div style={notifStyle}>{message}</div>;
  };
  
  export default Notification;
  