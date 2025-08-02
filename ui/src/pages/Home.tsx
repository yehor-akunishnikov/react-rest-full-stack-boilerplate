import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <p>Home works!</p>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
