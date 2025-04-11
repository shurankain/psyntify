import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Psyntify Auth</h1>
      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <LoginForm />
          <div className="my-6 border-t pt-4">
            <RegisterForm />
          </div>
        </>
      )}
    </div>
  );
}
