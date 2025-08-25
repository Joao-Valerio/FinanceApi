import SignUp from "../components/signup/signup";

export function meta() {
  return [
    { title: "Sign Up - Finance Api" },
    { name: "description", content: "Criar conta no Finance Api" },
  ];
}

export default function SignUpRoute() {
  return <SignUp />;
}