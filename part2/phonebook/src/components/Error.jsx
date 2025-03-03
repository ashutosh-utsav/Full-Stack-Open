const Error = ({ message }) => {
    const notifStyle = {
      display: "grid",
      placeItems: "center",
      fontSize: 36,
      color: "red",
      backgroundColor: "lightgrey",
      border: "2px dashed red",
      borderRadius: "20px 20px 20px 20px",
    };
  
    if (message === null) {
      return null;
    }
  
    return <div style={notifStyle}>{message}</div>;
  };
  
  export default Error;
  