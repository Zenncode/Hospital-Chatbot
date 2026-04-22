import AppointmentForm from "@/components/AppointmentForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AppointmentsPage() {
  return (
    <div className="site-shell space-y-8 pb-8">
      <ProtectedRoute
        allowedRoles={["patient", "admin"]}
        redirectTo="/appointments"
        title="Patient appointments"
        description="This page is reserved for signed-in patient and admin users."
      >
        <section className="panel px-6 py-8 sm:px-8">
          <p className="eyebrow">Patient Area</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
            Appointment requests
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate">
            Submit a new appointment request here. The record is written to the
            `appointments` collection and can be reviewed from the admin panel.
          </p>
        </section>

        <AppointmentForm />
      </ProtectedRoute>
    </div>
  );
}
