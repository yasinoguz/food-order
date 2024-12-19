import Footer from "../../compoents/layout/footer";
import Header from "../../compoents/layout/Header";
import Title from "../../ui/title";
import Input from "../../compoents/Input";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/login";
import Link from "next/link";
import { useSession, signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Index = ({ user }) => {
  const { data: session, status } = useSession(); // status eklendi
  const { push } = useRouter();
  const [currentUser, setCurrentUser] = useState();

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res.error) {
      console.error("Login failed:", res.error);
    } else {
      console.log("Login successful:", res);
      push("/profile"); // Başarılı giriş sonrası yönlendirme
    }
    actions.resetForm();
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setCurrentUser(
          res.data?.find((user) => user.email === session?.user?.email)
        );
        push("/profile/" + currentUser?._id);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [session, push, currentUser]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div>
      <Header />
      <form
        className="container mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col items-center my-20 w-1/2 mx-auto">
          <Title addclas={"text-[40px] mb-6"}>Login</Title>
          <div className="flex flex-col gap-y-2 w-full mt-2">
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
            <div className="flex flex-col w-full gap-y-3 mt-6">
              <button className="btn-primary" type="submit">
                LOGIN
              </button>
              <button
                className="btn-primary !bg-secondary"
                type="button"
                onClick={() => {
                  signIn("github");
                }}
              >
                <i className="fa fa-github mr-2 text-lg"></i>
                GITHUB
              </button>
            </div>

            <Link href="/auth/register">
              <span className="text-sm underline cursor-pointer text-secondary">
                Do you no have a account?
              </span>
            </Link>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);

  if (session && user) {
    return {
      redirect: {
        destination: "/profile/" + user._id,
        permanent: false,
      },
    };
  }
  return {
    props: { user: user ? user : null },
  };
}

export default Index;
