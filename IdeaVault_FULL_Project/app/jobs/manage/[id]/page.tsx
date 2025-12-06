"use client";

import { useEffect, useState } from "react";
import { db } from "../../../../firebase/config";  // 👈 FIXED IMPORT
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ManageJob({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      const jobRef = doc(db, "jobs", id);
      const snapshot = await getDoc(jobRef);

      if (snapshot.exists()) {
        setJob({ id: snapshot.id, ...snapshot.data() });
      } else {
        console.error("Job not found");
      }
    } catch (error) {
      console.error("Error loading job:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "jobs", id));
      alert("Job deleted");
      router.push("/jobs/find");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete job.");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-300">Loading job...</p>;
  }

  if (!job) {
    return <p className="p-6 text-red-400">Job not found.</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Manage Job</h1>

      <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-yellow-400">{job.title}</h2>
        <p className="text-gray-300 mt-2">{job.description}</p>
        <p className="text-gray-400 mt-1">Budget: ${job.budget || "N/A"}</p>
        <p className="text-gray-400 mt-1">
          Posted by: {job.postedBy || "Unknown"}
        </p>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Job
        </button>

        <button
          onClick={() => router.push(`/jobs/find`)}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-800"
        >
          Back
        </button>
      </div>
    </div>
  );
}
