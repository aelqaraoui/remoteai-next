import { useState } from "react";
import Link from "next/link";
import styles from './joblist.module.css'

export default function JobList({ jobs, email }) {
    
    const [ expandedJob, setExpandedJob ] = useState(null)

    function handleJobClick(jobId, jobUrl) {

        if (expandedJob === jobId) {
            setExpandedJob(null)
        } else {
            setExpandedJob(jobId)
            fetch("/api/profile/expand", {
                method: "POST",
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*" 
                },
                body: JSON.stringify({ email, url: jobUrl }),
            }).then(response => response.json())
            .then(console.log)
        }
    }

    return (
      <div className={styles.job_list}>
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`${styles.job} ${expandedJob === job.id ? styles.active : ''}`}
            onClick={() => handleJobClick(job.id, job.url)}
          >
            <div className={styles.job_details}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p className={styles.job_salary}>{job.salary}</p>
              {expandedJob === job.id && (
                <div className={styles.job_description}>
                  <h4>Description</h4>
                  <div dangerouslySetInnerHTML={{ __html: job.description_html }} />
                  {/*<p>{job.description}</p>*/}
                </div>
              )}
            </div>
            <div className={styles.job_skills}>
              {job.skills.map((skill, index) => (
                <span key={index} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
            <Link href={job.url} onClick={() => {
                    console.log("Heeere boyyy")
                    fetch("/api/profile/apply", {
                        method: "POST",
                        headers: { 
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*" 
                        },
                        body: JSON.stringify({ email, url: job.url }),
                    }).then(response => response.json())
                    .then(console.log)
                }} className={styles.apply_now} target='blank_'>Apply Now</Link>
          </div>
        ))}
      </div>
    );
    
}
