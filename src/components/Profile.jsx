import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div className="flex gap-2 sm:gap-4 md:gap-8">
      <Link
        to="/mywill"
        className="grid place-items-center px-4 bg-gray-500 rounded-md text-gray-50 active:scale-95"
      >
        My Will
      </Link>
      <div className="flex gap-4 items-center">
        <img src={user.picture} alt={user.name} className="rounded-full w-10" />
        <h2 className="hidden sm:block">{user.name}</h2>
      </div>
      <LogoutButton />
    </div>
  ) : (
    <LoginButton />
  );
};

export default Profile;
