import { Link } from "react-router-dom";

function Commuter() {
  return (
    <div>
      <h1>Welcome to the Commuter page</h1>
      <div>
        <Link to="/commuter/auth/register">
          <button>REGISTER</button>
        </Link>
        <Link to="/commuter/auth/login">
          <button>LOGIN</button>
        </Link>
      </div>
    </div>
  );
}

export default Commuter;
