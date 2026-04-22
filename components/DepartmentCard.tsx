import type { Department } from "@/types/department";

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <article className="panel h-full px-6 py-6">
      <p className="eyebrow">{department.location}</p>
      <h3 className="mt-3 text-2xl font-semibold text-ink">{department.name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate">{department.description}</p>
      <div className="mt-5 space-y-3 text-sm text-slate">
        <p>
          <span className="font-semibold text-ink">Schedule:</span> {department.schedule}
        </p>
        <p>
          <span className="font-semibold text-ink">Phone:</span> {department.contactNumber}
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {department.services.map((service) => (
          <span
            key={`${department.id}-${service}`}
            className="rounded-full border border-teal/15 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal"
          >
            {service}
          </span>
        ))}
      </div>
    </article>
  );
}

export default DepartmentCard;
