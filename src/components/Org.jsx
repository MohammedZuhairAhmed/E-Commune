import { Link } from "react-router-dom";

function Org() {
  return (
    <div>
      <h1>Welcome to the Organization page</h1>
      <div>
        <Link to="/organization/auth/register">
          <button>REGISTER</button>
        </Link>
        <Link to="/organization/auth/login">
          <button>LOGIN</button>
        </Link>
      </div>
    </div>
  );
}

export default Org;
