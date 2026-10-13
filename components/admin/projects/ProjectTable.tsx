"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { AdminProject } from "@/lib/admin/types";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { deleteAdminProject, createAdminProject } from "@/lib/admin/project-service";
import { useRouter } from "next/navigation";

interface ProjectTableProps {
  initialProjects: AdminProject[];
  styles: string[];
  rooms: string[];
}

export function ProjectTable({ initialProjects, styles, rooms }: ProjectTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [styleFilter, setStyleFilter] = useState("All");
  const [roomFilter, setRoomFilter] = useState("All");
  const [projects, setProjects] = useState<AdminProject[]>(initialProjects);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Simple client-side filtering since we are mocking it locally
  const filteredProjects = projects.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    if (styleFilter !== "All" && p.style !== styleFilter) return false;
    if (roomFilter !== "All" && p.rooms.toString() !== roomFilter) return false;
    return true;
  });

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteAdminProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      router.refresh();
    });
  };

  const handleDuplicate = (project: AdminProject) => {
    startTransition(async () => {
      const duplicated = await createAdminProject({
        ...project,
        name: `${project.name} — Copy`,
        slug: `${project.slug}-copy-${Date.now()}`,
        status: "DRAFT",
      });
      setProjects((prev) => [duplicated, ...prev]);
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters & Search */}
      <AdminCard className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-4 py-2 bg-[var(--color-surface-muted)] border border-transparent focus:border-[var(--color-accent)] rounded-[var(--radius-md)] text-sm outline-none transition-all duration-200"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none">
            <option value="All">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <select value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none">
            <option value="All">All Styles</option>
            {styles.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={roomFilter} onChange={(e) => setRoomFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none">
            <option value="All">All Rooms</option>
            {rooms.filter(r => r !== "All").map(r => <option key={r} value={r}>{r} Rooms</option>)}
          </select>
        </div>
      </AdminCard>

      {/* Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Style</th>
                <th className="px-4 py-3 font-medium">Rooms</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                    No projects found. Try changing your filters or create a new project.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-[var(--color-paper)] transition-colors group">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-[var(--radius-sm)] overflow-hidden bg-[var(--color-surface-muted)] relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.coverImage} alt={project.name} className="object-cover w-full h-full" />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--color-ink)]">{project.name}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{project.propertyType}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{project.style}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{project.rooms}</td>
                    <td className="px-4 py-3"><AdminBadge status={project.status} /></td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{project.featured ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleDuplicate(project)} disabled={isPending} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-ink)]" title="Duplicate">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
                        </button>
                        <Link href={`/admin/projects/${project.id}`} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-ink)]" title="Edit">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.112l-2.83.858a.5.5 0 01-.63-.63l.858-2.83a4.5 4.5 0 011.113-1.89l13.41-13.41z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125L16.875 4.5" /></svg>
                        </Link>
                        <button onClick={() => setDeleteConfirmId(project.id)} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-error)]" title="Archive">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface-elevated)] p-6 rounded-[var(--radius-lg)] max-w-sm w-full shadow-lg border border-[var(--color-border)]">
            <h3 className="text-lg font-serif mb-2">Archive Project</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Are you sure you want to archive this project? This action can be undone later from the archived filter.</p>
            <div className="flex justify-end gap-3">
              <button disabled={isPending} onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 text-sm text-[var(--color-ink)] bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] hover:bg-[var(--color-border)] transition-colors">
                Cancel
              </button>
              <button disabled={isPending} onClick={() => handleDelete(deleteConfirmId)} className="px-4 py-2 text-sm text-white bg-[var(--color-error)] rounded-[var(--radius-md)] hover:opacity-90 transition-opacity">
                {isPending ? "Archiving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
