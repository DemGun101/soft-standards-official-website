'use client';

import { useState } from 'react';
import type { CaseStudy } from '@/data/caseStudies';
import { ArrowUpRightIcon } from '@/components/Icons';

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-[28px] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all duration-400 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 overflow-hidden">
      {/* Color accent bar */}
      <div className="h-1" style={{ backgroundColor: study.colorTheme }} />

      {/* Card content */}
      <div className="p-6 sm:p-7">
        {/* Row 1: Category tag + subtitle */}
        <div className="flex items-center flex-wrap">
          <span
            className="inline-flex px-3 py-1 rounded-full text-[0.75rem] font-semibold"
            style={{
              backgroundColor: `${study.colorTheme}26`,
              color: study.colorTheme,
            }}
          >
            {study.categoryTag}
          </span>
          <span className="text-[0.85rem] text-gray-400 ml-3">
            {study.subtitle}
          </span>
        </div>

        {/* Row 2: Title */}
        <h3 className="text-[1.2rem] sm:text-[1.35rem] font-extrabold text-gray-900 tracking-[-0.02em] mt-3 mb-2">
          {study.title}
        </h3>

        {/* Row 3: Description */}
        <p
          className={`text-[0.88rem] text-gray-600 leading-[1.7] mb-4 ${
            !isExpanded ? 'line-clamp-3' : ''
          }`}
        >
          {study.description}
        </p>

        {/* Row 4: Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {study.techTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[0.72rem] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Row 5: Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-[0.85rem] font-semibold cursor-pointer transition-colors"
          style={{ color: study.colorTheme }}
          aria-expanded={isExpanded}
        >
          View Case Study
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Expanded content */}
        <div
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
          style={{ maxHeight: isExpanded ? '1000px' : '0px' }}
        >
          <div className="pt-5">
            {/* Challenge */}
            <div className="bg-purple-50 rounded-[16px] p-5 mb-4">
              <p className="text-[0.7rem] font-bold text-purple-700 uppercase tracking-wider mb-2">
                Challenge
              </p>
              <p className="text-[0.85rem] text-gray-700 leading-[1.7]">
                {study.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-cyan-50 rounded-[16px] p-5 mb-4">
              <p className="text-[0.7rem] font-bold text-cyan-700 uppercase tracking-wider mb-2">
                Solution
              </p>
              <p className="text-[0.85rem] text-gray-700 leading-[1.7]">
                {study.solution}
              </p>
            </div>

            {/* Key Results */}
            <div className="mb-5">
              <p className="text-[0.7rem] font-bold text-gray-900 uppercase tracking-wider mb-3">
                Key Results
              </p>
              <ul className="space-y-2">
                {study.keyResults.map((result, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="mt-2 w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: study.colorTheme }}
                    />
                    <span className="text-[0.85rem] text-gray-700">
                      {result}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit Site button */}
            {study.url && (
              <a
                href={`https://${study.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.85rem] font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: study.colorTheme }}
              >
                Visit Site
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
