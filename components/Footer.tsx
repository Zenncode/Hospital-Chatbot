"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getContactInfo } from "@/lib/data";
import { demoContactInfo } from "@/lib/demo-content";
import type { ContactInfo } from "@/types/contact-info";

export function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(demoContactInfo);

  useEffect(() => {
    getContactInfo()
      .then(setContactInfo)
      .catch(() => setContactInfo(demoContactInfo));
  }, []);

  return (
    <footer className="site-shell pb-8 pt-16">
      <div className="panel overflow-hidden">
        <div className="grid gap-10 px-6 py-8 md:grid-cols-[1.4fr_1fr] md:px-8">
          <div>
            <p className="eyebrow">Medical Disclaimer</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">
              Safety-focused hospital guidance only
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate">
              This fictional chatbot returns fixed FAQ answers and basic symptom
              safety guidance. It does not diagnose conditions, prescribe treatment,
              or replace professional medical care.
            </p>
          </div>

          <div className="space-y-3 text-sm text-slate">
            <div>
              <p className="font-semibold text-ink">{contactInfo.hospitalName}</p>
              <p>{contactInfo.address}</p>
            </div>
            <p>{contactInfo.phone}</p>
            <p>{contactInfo.email}</p>
            <p>{contactInfo.workingHours}</p>
            <Link href="/contact" className="inline-flex text-sm font-semibold text-teal">
              View contact page
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
