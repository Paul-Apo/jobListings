"use client";

import { useState } from "react";
type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  logoBg: string; // Tailwind bg color for the circle logo
  logoText: string; // Initials or emoji
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Young Men Christians Association",
    location: "Addis Ababa, Ethiopia",
    description:
      "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns. You will be responsible for assisting in the creation and scheduling of engaging content, monitoring social media channels, and interacting with followers.",
    tags: ["In Person", "Education", "IT"],
    logoBg: "bg-yellow-300",
    logoText: "YM",
  },
  {
    id: 2,
    title: "Social Media Assistant",
    company: "Young Men Christians Association",
    location: "Addis Ababa, Ethiopia",
    description:
      "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns. You will be responsible for assisting in the creation and scheduling of engaging content, monitoring social media channels, and interacting with followers.",
    tags: ["In Person", "Education", "IT"],
    logoBg: "bg-sky-200",
    logoText: "Y",
  },
  {
    id: 3,
    title: "Volunteer Teacher",
    company: "School Under The Tree",
    location: "Addis Ababa, Ethiopia",
    description:
      "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns. You will be responsible for assisting in the creation and scheduling of engaging content, monitoring social media channels, and interacting with followers.",
    tags: ["In Person", "Education", "IT"],
    logoBg: "bg-orange-200",
    logoText: "ST",
  },
  {
    id: 4,
    title: "Social Media Assistant",
    company: "The Africa in me",
    location: "Addis Ababa, Ethiopia",
    description:
      "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns. You will be responsible for assisting in the creation and scheduling of engaging content, monitoring social media channels, and interacting with followers.",
    tags: ["In Person", "Education", "IT"],
    logoBg: "bg-red-200",
    logoText: "AM",
  },
];

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

const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="rounded-[22px] border border-gray-200 p-6 shadow-sm">
      <div className="flex gap-4">
        <div
          className={`h-14 w-14 shrink-0 rounded-full ${job.logoBg} flex items-center justify-center text-sm font-bold text-gray-800`}
        >
          {job.logoText}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {job.company} • {job.location}
          </p>
          <p className="text-sm text-gray-600 mt-3 leading-6">
            {job.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {job.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortedBy, setSortedBy] = useState("Most Relevant");
  return (
    <div className="pt-6 max-w-4xl mx-auto px-6">
      <div className="flex flex-row justify-between items-start">
        <div>
          <div>
            <h1 className="text-3xl font-bold">Opportunities</h1>
          </div>
          <div>
            <p className="opacity-50 text-sm">Showing 73 results</p>
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
            <img
              src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
              className="w-5 h-5"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-lg text-left cursor-pointer font-medium z-10">
              <ul className="py-2 text-sm">
                <li
                  onClick={() => {
                    setIsOpen(false);
                    setSortedBy("Most Relevant");
                  }}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  Most relevant
                </li>
                <li
                  onClick={() => {
                    setIsOpen(false);
                    setSortedBy("Most Popular");
                  }}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  Most Popular
                </li>
                <li
                  onClick={() => {
                    setIsOpen(false);
                    setSortedBy("Most Up to date");
                  }}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  Most Up to date
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 space-y-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
