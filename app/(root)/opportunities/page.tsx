"use client";

import { useEffect, useState } from "react";
import { JobCard, type Job } from "@/components/JobCard";

export default function OpportunitiesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortedBy, setSortedBy] = useState("Most Relevant");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/jobs.json", { cache: "no-store" });
        const data = await res.json();
        const list: any[] = data.job_postings ?? [];
        const mapped: Job[] = list.map((j: any, idx: number) => ({
          id: idx + 1,
          title: j.title ?? "Untitled",
          company: j.organization ?? j.company ?? "Unknown org",
          location: j.location ?? "",
          description: j.description ?? "",
          tags: Array.isArray(j.tags) ? j.tags : [],
          avatarUrl: j.avatarUrl,
        }));
        setJobs(mapped);
      } catch {
        setJobs([]);
      }
    };
    load();
  }, []);

  return (
    <div className="pt-6 max-w-4xl mx-auto px-6">
      <div className="flex flex-row justify-between items-start">
        <div>
          <div>
            <h1 className="text-3xl font-bold">Opportunities</h1>
          </div>
          <div>
            <p className="opacity-50 text-sm">Showing {jobs.length} results</p>
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center text-sm">
            <label className="text-gray-600">Sort by:</label>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-3 font-semibold inline-flex items-center gap-2"
            >
              {sortedBy}
            </button>
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-lg text-left cursor-pointer font-medium z-10">
              <ul className="py-2 text-sm">
                {[
                  "Most Relevant",
                  "Most Popular",
                  "Most Up to date",
                ].map((opt) => (
                  <li
                    key={opt}
                    onClick={() => {
                      setIsOpen(false);
                      setSortedBy(opt);
                    }}
                    className="px-4 py-2 hover:bg-gray-50"
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {jobs.length === 0 && (
          <p className="text-sm text-gray-500">No jobs found.</p>
        )}
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} href="/dashboard" />
        ))}
      </div>
    </div>
  );
}
