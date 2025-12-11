
const Messages = () => {
  return (
    <>
    <div className="message-component">
      <div className="alert alert-danger text-start" role="alert">
          An error occured please try again later
        </div>
        <div className="alert alert-warning" role="alert">
          Sorry! No records found.
        </div>
    </div>
    </>
  );
};

export default Messages;
