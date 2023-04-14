import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/loading.module.css'
import homestyles from '@/styles/home.module.css'
import Layout from '@/components/layout'
import JobList from '@/components/joblist'
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home(props) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading2, setLoading2] = useState(true);

  /*useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session, router]);*/

  useEffect(() => {
    if(session){
      console.log(session.user.email)

      fetch("/api/profile/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      }).then(response => response.json())
      .then((response) => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/embed", {
          method: "POST",
          headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
          },
          body: JSON.stringify(response.result),
        }).then(response => response.json())
        .then(fetchedData => {
          let result = []
          for(let i = 0; i < fetchedData.length; i++){
            result.push({
              id: i+1,
              title: fetchedData[i]['title'],
              company: fetchedData[i]['company'],
              location: fetchedData[i]['location'],
              skills: [fetchedData[i]['jobType'], fetchedData[i]['jobLevel']],
              salary: fetchedData[i]['salary'],
              description: fetchedData[i]['description'],
              description_html: fetchedData[i]['description_html'],
              url: fetchedData[i]['url'],
              hash: fetchedData[i]['hash'],
            })
          }

          setJobs(result)
          setLoading2(false)
        }).catch(console.error)

      })
      .catch(console.error);
    }

  }, [session])

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <>
      <Head>
        <title>remoteAI</title>
        <meta name="description" content="personalized remote AI jobs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout isAuthenticated={session} handleLogout={handleLogout} >
        {

          !session ? (
            <div className={homestyles.container}>
              <p className={homestyles.centered_text}>Login/Register to get a personalized feed of remote AI jobs.</p>
            </div>
          ) : loading || loading2 ? (
            <div className={styles.loading_screen}>
              <div className={styles.loading_text}>
                Loading
                <span className={styles.loading_dots}>
                  <span className={`${styles.dot}  ${styles.dot_1}`}>.</span>
                  <span className={`${styles.dot}  ${styles.dot_2}`}>.</span>
                  <span className={`${styles.dot}  ${styles.dot_3}`}>.</span>
                </span>
              </div>
            </div>
          ) : (
            <JobList jobs={jobs} email={session.user.email} />
          )
          
        }
      </Layout>
    </>
  )
}
