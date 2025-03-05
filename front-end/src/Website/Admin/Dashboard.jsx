import { useAuth } from "../../Context/AuthProvider";

export default function Dashboard() {
  const { auth } = useAuth();

  if (!auth || !auth.user) {
    return <p>Loading...</p>; // Or redirect to login
  }

  return (
    <div className="container">
      <p>Hello, {auth.user.name}</p>
      <p>your email is {auth.user.email}</p>
      <p>your password is {auth.user.password}</p>
      <img src={auth.user.profilePicture} width={32} height={32} alt="" />
    </div>
  );
}
