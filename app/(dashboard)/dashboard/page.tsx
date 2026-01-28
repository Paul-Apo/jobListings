"use client";

import React, { useEffect, useState } from "react";

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 leading-7">
    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-green-300 bg-green-50 text-green-600 text-xs">✓</span>
    <span className="text-gray-700 text-[15px]">{children}</span>
  </li>
);

const Pill = ({ label, color }: { label: string; color?: string }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
      color || "border-gray-200 text-gray-700 bg-gray-50"
    }`}
  >
    {label}
  </span>
);

type JobDoc = {
  title: string;
  organization: string;
  location: string;
  description: string;
  postedOn?: string;
  deadline?: string;
  startDate?: string;
  endDate?: string;
  categories?: string[];
  skills?: string[];
  responsibilities?: string[];
  idealCandidate?: string[];
  whenWhere?: string;
};

export default function Dashboard() {
  const [job, setJob] = useState<JobDoc | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/jobs.json", { cache: "no-store" });
        const data = await res.json();
        const list: JobDoc[] = data.job_postings ?? [];
        setJob(list[0] ?? null);
      } catch {
        setJob(null);
      }
    };
    load();
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-sm text-gray-500 mb-4">Applicant Dashboard / Description</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main content */}
        <main className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section className="rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-7 text-[15px]">
              {job?.description ?? "Loading description..."}
            </p>
          </section>

          {/* Responsibilities */}
          <section className="rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
            <ul className="space-y-2">
              {(job?.responsibilities ?? ["Loading..."]).map((r, i) => (
                <Bullet key={i}>{r}</Bullet>
              ))}
            </ul>
          </section>

          {/* Ideal Candidate */}
          <section className="rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold mb-4">Ideal Candidate we want</h2>
            <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-700">
              {(job?.idealCandidate ?? ["Loading..."]).map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </section>

          {/* When & Where */}
          <section className="rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold mb-3">When & Where</h2>
            <div className="flex items-start gap-3 text-[15px] text-gray-700">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border bg-blue-50 text-blue-600">📍</span>
              <p>{job?.whenWhere ?? "Loading..."}</p>
            </div>
          </section>
        </main>

        {/* Right: Sidebar */}
        <aside className="space-y-6">
          <section className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-blue-50 text-blue-600">📅</span>
                  <div>
                    <p className="text-gray-500">Posted On</p>
                    <p className="font-medium">{job?.postedOn ?? "--"}</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-blue-50 text-blue-600">🔥</span>
                  <div>
                    <p className="text-gray-500">Deadline</p>
                    <p className="font-medium">{job?.deadline ?? "--"}</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-blue-50 text-blue-600">📍</span>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">{job?.location ?? "--"}</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-blue-50 text-blue-600">🗓️</span>
                  <div>
                    <p className="text-gray-500">Start Date</p>
                    <p className="font-medium">{job?.startDate ?? "--"}</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-blue-50 text-blue-600">🗓️</span>
                  <div>
                    <p className="text-gray-500">End Date</p>
                    <p className="font-medium">{job?.endDate ?? "--"}</p>
                  </div>
                </div>
              </li>
            </ul>
            <hr className="my-5" />
            <h4 className="font-semibold mb-3">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {(job?.categories ?? []).map((c) => (
                <Pill
                  key={c}
                  label={c}
                  color={
                    c === "Marketing"
                      ? "border-yellow-300 text-yellow-700 bg-yellow-50"
                      : c === "Design"
                      ? "border-green-300 text-green-700 bg-green-50"
                      : "border-gray-200 text-gray-700 bg-gray-50"
                  }
                />
              ))}
            </div>
            <h4 className="font-semibold mt-6 mb-3">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {(job?.skills ?? []).map((s) => (
                <Pill key={s} label={s} />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
