import Head from 'next/head'
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
              {/*<p className={homestyles.centered_text}>Login/Register to get a personalized feed of remote AI jobs.</p>*/}
              <p>Dear Reader:</p>
              <p>On a beautiful late spring afternoon, twenty-five years ago, two young men graduated from the same college. They were very much alike, these two young men. Both had been better than average students, both were personable and both — as young college graduates are — were filled with ambitious dreams for the future.</p>
              <p>Recently, these men returned to their college for their 25th reunion.</p>
              <p>They were still very much alike. Both were happily married. Both had three children. And both, it turned out, had gone to work for similar companies after graduation, and were still there.</p>
              <p>But there was a difference.</p>
              <p>One of the men was manager of a small department of that company. The other was CTO.</p>
              <h2><span><strong>What Made The Difference</strong></span></h2>
              <p>Have you ever wondered, as I have, what makes this kind of difference in people&#x27;s lives? It isn&#x27;t a native intelligence or talent or dedication. It isn&#x27;t that one person wants success and the other doesn&#x27;t.</p>
              <p>The difference lies in the number of jobs applied for and where they applied during their career.</p>
              <p>And that is why I am writing to you and to people like you about remoteAI. For that is the whole purpose of remoteAI: to provide its users with opportunities — opportunities that they can seize to advance their careers.</p>
              <h2><span><strong>A Job Board Unlike Any Other</strong></span></h2>
              <p>remoteAI is a unique job board that combines artificial intelligence with a user-friendly interface to bring you the most relevant job opportunities from around the world. Our app serves you a personalized feed of job postings tailored to your skills, interests, and career goals. remoteAI is designed to empower you with the knowledge and opportunities you need to continuously grow and advance in your career, helping you stay informed and ahead of the competition.</p>
              <h2><span><strong>A Free Tool for Your Success</strong></span></h2>
              <p>We invite you to put our claims to the test by trying remoteAI, absolutely free. This allows you to experience the benefits of our platform and discover how remoteAI can help you take control of your career.</p><p>To get started, register for a new account in the top right corner of this page.</p>
              <p>About those two college classmates I mentioned at the beginning of this letter: they graduated from college together and got started in the corporate world together. So what made their lives different?</p><p>The one who achieved greater success took control of his career by constantly seeking new opportunities and learning experiences. remoteAI can help you do the same.</p>
              <h2><span><strong>A Simple Promise</strong></span></h2>
              <p>I cannot promise you that success will be instantly yours if you start using remoteAI. But I can guarantee that you will find our platform always interesting, always reliable, and always useful.</p>
              <p>Sincerely,</p><p>Amine ElQaraoui</p>
              <p>P.S. Don&#x27;t forget to share remoteAI with your friends and colleagues – together, you can support each other in achieving your career goals.</p>
              <br/>
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
