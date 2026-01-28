"use client";

import React from "react";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  avatarUrl?: string;
};

export type { Job };

const Tag = ({ label }: { label: string }) => {
  const colorMap: Record<string, string> = {
    "In Person": "border-green-300 text-green-700 bg-green-50",
    Education: "border-yellow-300 text-yellow-700 bg-yellow-50",
    IT: "border-purple-300 text-purple-700 bg-purple-50",
  };
  const color = colorMap[label] ?? "border-gray-200 text-gray-700 bg-white";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium gap-1 ${color}`}
    >
      {label}
    </span>
  );
};

export function JobCard({ job, href }: { job: Job; href?: string }) {
  const CardInner = (
    <div className="rounded-[22px] border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
      <div className="flex gap-4">
        {job.avatarUrl ? (
          <img
            src={job.avatarUrl}
            alt={job.company}
            className="h-14 w-14 shrink-0 rounded-full object-cover border"
          />
        ) : (
          <div className={`h-14 w-14 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-800`}>
            {job.company
              .split(" ")
              .slice(0, 2)
              .map((s) => s[0])
              .join("")
              .toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {job.company} • {job.location}
          </p>
          <p className="text-sm text-gray-600 mt-3 leading-6">{job.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {job.tags?.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="block">
        {CardInner}
      </Link>
    );
  }
  return CardInner;
}
