function Protected_commuter({ data }) {
  return (
    <div>
      <h1>Welcome to the Protected_commuter page</h1>
      <div>
        <ul>
          <li>ID: {data._id}</li>
          <li>Name: {data.username}</li>
          <li>Email: {data.email}</li>
        </ul>
      </div>
    </div>
  );
}

export default Protected_commuter;
