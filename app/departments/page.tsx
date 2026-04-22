import DepartmentDirectory from "@/components/DepartmentDirectory";

export default function DepartmentsPage() {
  return (
    <div className="site-shell space-y-10 pb-8">
      <section className="panel px-6 py-8 sm:px-8">
        <p className="eyebrow">Departments</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
          Browse hospital services by department
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate">
          Department records include descriptions, services, location, hours, and
          phone numbers. Admins can update this directory from the dashboard.
        </p>
      </section>

      <DepartmentDirectory />
    </div>
  );
}
