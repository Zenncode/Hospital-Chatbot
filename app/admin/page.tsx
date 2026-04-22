import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <div className="site-shell pb-8">
      <ProtectedRoute
        allowedRoles={["admin"]}
        redirectTo="/admin"
        title="Admin access only"
        description="This page is available only to authenticated admin users."
      >
        <AdminDashboard />
      </ProtectedRoute>
    </div>
  );
}
