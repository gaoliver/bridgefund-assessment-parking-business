import { Button, Card, Loader } from "@/components/atoms";
import { TextInput } from "@/components/molecules";
import styles from "@/styles/login.module.css";
import { LoginWithPasswordDto } from "@/types/api";
import { encrypt } from "@/utils/encrypt";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import * as yup from "yup";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { handleChange, values, handleSubmit } =
    useFormik<LoginWithPasswordDto>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: schema,
      validateOnChange: false,
      onSubmit: async (values) => {
        setIsLoading(true);

        await signIn("credentials", {
          email: values.email,
          password: encrypt(values.password),
          callbackUrl: "/dashboard",
        }).catch((error) => {
          setErrorMessage(error.message);
          setIsLoading(false);
        });
      },
    });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error) {
      setErrorMessage(error);
    }
  }, []);

  return (
    <main className={styles.main}>
      <Card style={{ maxWidth: "400px", minWidth: "200px" }}>
        <h1>Login</h1>

        <div className={styles.fields} role="form">
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="example@site.com"
            value={values.email}
            onChange={handleChange}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>

        {errorMessage && <span className={styles.error}>{errorMessage}</span>}

        <Button variant="primary" onClick={() => handleSubmit()}>
          Login
        </Button>
        {isLoading && (
          <div className={styles.loader_wrapper}>
            <Loader />
          </div>
        )}
      </Card>
    </main>
  );
};

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Page;
