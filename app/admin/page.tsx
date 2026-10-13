import { AdminCard } from "@/components/admin/AdminCard";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { getDashboardKPIs, getRecentLeads, getRecentConsultations, getContentOverview } from "@/lib/admin/dashboard-service";
import Link from "next/link";
import { DashboardKPIs, Lead, Consultation, ContentOverview } from "@/lib/admin/types";

export default async function AdminDashboardPage() {
  const [kpis, leads, consultations, content] = await Promise.all([
    getDashboardKPIs() as Promise<DashboardKPIs>,
    getRecentLeads() as Promise<Lead[]>,
    getRecentConsultations() as Promise<Consultation[]>,
    getContentOverview() as Promise<ContentOverview>,
  ]);

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Dashboard Overview</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Welcome back. Here is what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/projects/new" className="px-4 py-2 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-ink-soft)] transition-colors">
            + New Project
          </Link>
          <Link href="/admin/designs/new" className="px-4 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-ink)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-surface-muted)] transition-colors">
            + New Design
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdminCard className="flex flex-col justify-center">
          <div className="text-[var(--text-body-s)] text-[var(--color-text-subtle)] font-medium uppercase tracking-wider mb-1">Projects</div>
          <div className="text-3xl font-serif text-[var(--color-ink)]">{kpis.totalProjects}</div>
        </AdminCard>
        <AdminCard className="flex flex-col justify-center">
          <div className="text-[var(--text-body-s)] text-[var(--color-text-subtle)] font-medium uppercase tracking-wider mb-1">Active Leads</div>
          <div className="text-3xl font-serif text-[var(--color-ink)]">{kpis.activeLeads}</div>
        </AdminCard>
        <AdminCard className="flex flex-col justify-center">
          <div className="text-[var(--text-body-s)] text-[var(--color-text-subtle)] font-medium uppercase tracking-wider mb-1">Consultations</div>
          <div className="text-3xl font-serif text-[var(--color-ink)]">{kpis.newConsultations}</div>
        </AdminCard>
        <AdminCard className="flex flex-col justify-center">
          <div className="text-[var(--text-body-s)] text-[var(--color-text-subtle)] font-medium uppercase tracking-wider mb-1">Pending Estimates</div>
          <div className="text-3xl font-serif text-[var(--color-ink)]">{kpis.pendingEstimates}</div>
        </AdminCard>
      </div>

      {/* Two Column Layout for Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* Recent Leads */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-serif text-[var(--color-ink)]">Recent Leads</h2>
            <Link href="/admin/leads" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-ink)] font-medium transition-colors">
              View All
            </Link>
          </div>
          <AdminCard noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Service</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[var(--color-paper)] transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--color-ink)]">{lead.name}</td>
                      <td className="px-4 py-3 text-[var(--color-text-muted)]">{lead.service}</td>
                      <td className="px-4 py-3"><AdminBadge status={lead.status} /></td>
                      <td className="px-4 py-3 text-[var(--color-text-subtle)] text-right text-xs">{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCard>
        </div>

        {/* Recent Consultations */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-serif text-[var(--color-ink)]">Recent Consultations</h2>
            <Link href="/admin/consultations" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-ink)] font-medium transition-colors">
              View All
            </Link>
          </div>
          <AdminCard noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 font-medium">Timeline</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {consultations.map((cons) => (
                    <tr key={cons.id} className="hover:bg-[var(--color-paper)] transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--color-ink)]">{cons.client}</td>
                      <td className="px-4 py-3 text-[var(--color-text-muted)]">{cons.timeline}</td>
                      <td className="px-4 py-3"><AdminBadge status={cons.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Content Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif text-[var(--color-ink)]">Content Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminCard>
            <div className="text-sm font-medium text-[var(--color-ink)] mb-3">Projects</div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-serif text-[var(--color-ink)]">{content.projects.published}</div>
                <div className="text-xs text-[var(--color-text-subtle)]">Published</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-serif text-[var(--color-text-muted)]">{content.projects.draft}</div>
                <div className="text-xs text-[var(--color-text-subtle)]">Drafts</div>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <div className="text-sm font-medium text-[var(--color-ink)] mb-3">Designs</div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-serif text-[var(--color-ink)]">{content.designs.published}</div>
                <div className="text-xs text-[var(--color-text-subtle)]">Published</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-serif text-[var(--color-text-muted)]">{content.designs.draft}</div>
                <div className="text-xs text-[var(--color-text-subtle)]">Drafts</div>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <div className="text-sm font-medium text-[var(--color-ink)] mb-3">Services</div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-serif text-[var(--color-ink)]">{content.services.published}</div>
                <div className="text-xs text-[var(--color-text-subtle)]">Published</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-serif text-[var(--color-text-muted)]">{content.services.draft}</div>
                <div className="text-xs text-[var(--color-text-subtle)]">Drafts</div>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <div className="text-sm font-medium text-[var(--color-ink)] mb-3">Guides</div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-serif text-[var(--color-ink)]">{content.guides.published}</div>
                <div className="text-xs text-[var(--color-text-subtle)]">Published</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-serif text-[var(--color-text-muted)]">{content.guides.draft}</div>
                <div className="text-xs text-[var(--color-text-subtle)]">Drafts</div>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
