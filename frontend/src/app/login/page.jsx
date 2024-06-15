
import Provider from "../../../components/Providers/provider";
import LoginForm from "../../../components/login/LoginForm";

export default function Login() {

  return (
    <Provider>

    <div className="bg-white w-full min-h-screen">
      <LoginForm />
    </div>
    </Provider>
  );
}
