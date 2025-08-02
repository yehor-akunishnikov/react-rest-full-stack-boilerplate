import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="d-flex min-vh-100 p-1 justify-content-center align-items-center">
      <div className="col-12 col-lg-6 border border-1 py-4 py-lg-5 px-4 px-lg-5 rounded">
        <Outlet />
      </div>
    </div>
  );
}
