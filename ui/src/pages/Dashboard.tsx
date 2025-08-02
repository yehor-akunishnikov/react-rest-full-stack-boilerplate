import { Link } from "react-router";

import ProjectListing from "../features/project/components/ProjectListing";

export default function Dashboard() {
  return (
    <div>
      <p>Dashboard works</p>
      <ProjectListing />
      <Link to="/">Home</Link>
    </div>
  );
}
