"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getContactInfo } from "@/lib/data";
import { demoContactInfo } from "@/lib/demo-content";
import type { ContactInfo } from "@/types/contact-info";

export function ContactDetails() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(demoContactInfo);

  useEffect(() => {
    getContactInfo()
      .then(setContactInfo)
      .catch(() => setContactInfo(demoContactInfo));
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="panel px-6 py-6 sm:px-7">
        <p className="eyebrow">Contact Information</p>
        <h2 className="mt-3 text-3xl font-semibold text-ink">
          {contactInfo.hospitalName}
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-slate">
          <p>
            <span className="font-semibold text-ink">Phone:</span> {contactInfo.phone}
          </p>
          <p>
            <span className="font-semibold text-ink">Email:</span> {contactInfo.email}
          </p>
          <p>
            <span className="font-semibold text-ink">Address:</span> {contactInfo.address}
          </p>
          <p>
            <span className="font-semibold text-ink">Working hours:</span>{" "}
            {contactInfo.workingHours}
          </p>
        </div>
        <div className="mt-6">
          <Link
            href={contactInfo.mapLink}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Open map link
          </Link>
        </div>
      </section>

      <section className="panel px-6 py-6 sm:px-7">
        <p className="eyebrow">Visitor Guidance</p>
        <h2 className="mt-3 text-3xl font-semibold text-ink">Before you arrive</h2>
        <ul className="mt-5 space-y-4 text-sm leading-7 text-slate">
          <li>Bring a valid ID and any appointment confirmation details.</li>
          <li>Emergency department access stays open at all hours.</li>
          <li>ICU visits may require nursing-station approval.</li>
          <li>For symptom emergencies, seek in-person care immediately.</li>
        </ul>
      </section>
    </div>
  );
}

export default ContactDetails;
