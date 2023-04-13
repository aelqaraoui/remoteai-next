import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/form.module.css'
import Layout from '@/components/layout'
import { useRouter } from "next/router"
import { signIn } from "next-auth/react";

export default function Login() {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        console.log(result)

        if (result.error) {
            console.error("Error signing in:", result.error);


        } else {
            console.log('here')
            
            router.push("/");
        }
    };

    return (
        <>
        <Head>
            <title>remoteAI</title>
            <meta name="description" content="personalized remote AI jobs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <div className={styles.login}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" required />

                    <button type="submit">Login</button>
                </form>
            </div>
        </Layout>
        </>
    )
}
