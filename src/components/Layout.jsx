import Profile from "./Profile";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-slate-50 min-h-screen relative">
      <nav className="sticky top-0 bg-white p-8 flex justify-between xl:px-16 shadow-md">
        <Link to="/" className=" font-bold text-xl ">
          Wills
        </Link>
        <Profile />
      </nav>
      {children}
      <footer className=" absolute bottom-0 py-8 bg-white w-full border-t-2 text-center">
        <p>Leave your last words for nobody</p>
        <p className=" text-xs">
          Copyright © {currentYear} Rust. All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default Layout;
