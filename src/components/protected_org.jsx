function Protected_Org({ data }) {
  return (
    <div>
      <h1>Welcome to the protected_Organization page</h1>
      <div>
        <ul>
          <li>ID: {data._id}</li>
          <li>Name: {data.name}</li>
          <li>Email: {data.email}</li>
          {/* ...other properties */}
        </ul>
      </div>
    </div>
  );
}

export default Protected_Org;
