const Loader = () => {
  return (
    <>
     
        <button className="btn btn-primary Loader " type="button" disabled>
          <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span>
        </button>
     
    </>
  );
};

export default Loader;
