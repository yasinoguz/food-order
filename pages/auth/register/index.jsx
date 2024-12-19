import Footer from "../../../compoents/layout/footer";
import Header from "../../../compoents/layout/Header";
import Title from "../../../ui/title";
import Input from "../../../compoents/Input";
import { useFormik } from "formik";
import { registerSchema } from "../../../schema/register";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );

      if (res.status === 200) {
        toast.success("User created successfully");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
    actions.resetForm();
  };
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: registerSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your Password Again",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];

  return (
    <div>
      <Header />
      <form className="container mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center my-20 w-1/2 mx-auto">
          <Title addclas={"text-[40px] mb-6"}>Register</Title>
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
                Register
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

export default Index;
