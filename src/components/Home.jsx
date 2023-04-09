import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Home page</h1>
      <div>
        <Link to="/organization">
          <button>Organization</button>
        </Link>
        <Link to="/commuter">
          <button>Commuter</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
