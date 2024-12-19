import axios from "axios";
import Footer from "../../../compoents/layout/footer";
import Header from "../../../compoents/layout/Header";
import Title from "../../../ui/title";
import Input from "../../../compoents/Input";
import { useFormik } from "formik";
import { adminSchema } from "../../../schema/admin";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/dist/server/api-utils";

const Index = () => {
  const { push } = useRouter();

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin`,
        values
      );

      if (res.status === 200) {
        console.log("setheader", res);

        actions.resetForm();
        toast.success("Admin Login Success!");
        push("http://localhost:3000/auth/admin/profile");
      }
    } catch (err) {
      console.log(err);
      toast.warning("giriş yapılamadı");
      actions.resetForm();
    }
  };
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit,
      validationSchema: adminSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Your Username",
      value: values.username,
      errorMessage: errors.username,
      touched: touched.username,
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
      <form className="container mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center my-20 w-1/2 mx-auto">
          <Title addclas={"text-[40px] mb-6"}> Admin Login</Title>
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
            </div>

            <Link href="/">
              <span className="text-sm underline cursor-pointer text-secondary">
                Home page
              </span>
            </Link>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export const getServerSideProps = (ctx) => {
  // hazır bır foksyon bu  ctx contex verılerı hazır olarak gecılıyor sısteme
  console.log("ctxxx= " + ctx);

  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token === process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/auth/admin/profile",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Index;
