"use client";

import { useEffect, useState } from "react";

import DepartmentCard from "@/components/DepartmentCard";
import { getDepartments } from "@/lib/data";
import { demoDepartments } from "@/lib/demo-content";
import type { Department } from "@/types/department";

interface DepartmentDirectoryProps {
  limit?: number;
}

export function DepartmentDirectory({ limit }: DepartmentDirectoryProps) {
  const [departments, setDepartments] = useState<Department[]>(demoDepartments);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartments()
      .then((items) => setDepartments(items))
      .finally(() => setLoading(false));
  }, []);

  const visibleDepartments = limit ? departments.slice(0, limit) : departments;

  return (
    <div className="space-y-5">
      {loading && departments.length === 0 ? (
        <div className="panel px-6 py-8">
          <p className="text-sm text-slate">Loading department information...</p>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleDepartments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
    </div>
  );
}

export default DepartmentDirectory;
