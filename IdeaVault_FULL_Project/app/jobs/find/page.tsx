"use client";

import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const snapshot = await getDocs(collection(db, "jobs"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(list);
    } catch (err) {
      console.error("Failed to load jobs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Find Jobs</h1>

      {loading ? (
        <p className="text-gray-300">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-400">No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-700 bg-gray-900 p-4 rounded-lg"
            >
              <h2 className="text-xl font-semibold text-yellow-400">{job.title}</h2>
              <p className="text-gray-300 mt-1">{job.description}</p>

              <div className="mt-3">
                <Link
                  href={`/jobs/manage/${job.id}`}
                  className="text-yellow-400 underline hover:text-yellow-500"
                >
                  View Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

