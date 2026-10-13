# ADMIN FRONTEND V1 FREEZE

## 1. Admin Purpose
The Admin Dashboard provides a centralized, authenticated (future) interface to manage Sky Interior operations including content (Projects, Designs, Services, Guides), incoming operations (Leads, Consultations, Estimates, Messages), and administrative tasks (Users, Settings, Media Library).

## 2. Current Route Inventory
- `/admin` (Overview Dashboard)
- `/admin/projects` (Manage Portfolio Projects)
- `/admin/projects/new` 
- `/admin/projects/[id]` 
- `/admin/designs` (Manage Inspiration Designs)
- `/admin/designs/new`
- `/admin/designs/[id]`
- `/admin/services` (Manage Services Offered)
- `/admin/services/new`
- `/admin/services/[id]`
- `/admin/guides` (Manage Guides and Articles)
- `/admin/guides/new`
- `/admin/guides/[id]`
- `/admin/leads` (Manage Incoming Leads)
- `/admin/leads/[id]`
- `/admin/consultations` (Manage Consultation Requests)
- `/admin/consultations/[id]`
- `/admin/estimates` (Manage Estimate Generation)
- `/admin/estimates/[id]`
- `/admin/messages` (Manage Contact Messages)
- `/admin/messages/[id]`
- `/admin/media` (Manage Uploaded Media/Assets)
- `/admin/users` (Manage System Access)
- `/admin/users/[id]`
- `/admin/settings` (Manage Platform Config)

## 3. Admin Architecture
Currently, the Admin Dashboard is **Frontend-Only**. It is built natively into the existing Sky Interior Next.js application within the `/admin` routing namespace. The frontend relies heavily on modern React patterns, Server Actions, and a strictly enforced service layer.

## 4. Service-Layer Architecture
The application forces a strict boundary:
`UI Components -> Admin Service Layer -> Mock Data`

Every distinct module features a dedicated service file (e.g. `user-service.ts`, `media-service.ts`) housing all operations required for the UI, ensuring components never touch datasets directly.

## 5. Mock Data Strategy
- Deterministic IDs (e.g., `LEAD-001`, `MEDIA-001`).
- Deterministic ISO timestamps, bypassing `Date.now()` logic during renders to eliminate hydration errors.
- Fully in-memory state manipulation paired with Next.js `revalidatePath` allows components to behave identically to a live database application.

## 6. Current Limitations
- Refreshing the server resets all in-memory mock changes.
- "Uploads" do not generate accessible cloud URLs.
- "Emails" and notification settings are prototype toggles/logs only.

## 7. What is Intentionally NOT Implemented
- No Database (PostgreSQL/Prisma).
- No Authentication (NextAuth/JWT/Sessions).
- No API Endpoints (No `/api/...` backends).
- No External Storage (S3/MinIO).

## 8. Future Backend Integration Boundary
When the backend is built, **only the Service Layer will require rewrites**. 
The UI will seamlessly interact with the exact same Service abstraction signatures, which will internally pipe to the newly constructed REST APIs.

## 9. Future Database Requirements
- PostgreSQL with a fully featured relational schema handling relational links (e.g., `Consultation` tied to `Lead`).

## 10. Future Authentication Requirements
- Role-Based Access Control (RBAC) linking into `AdminUser` (ADMIN, EDITOR, MANAGER, VIEWER).

## 11. Future Media Storage Requirements
- External S3-compliant object storage providing presigned upload URLs.

## 12. Future API Requirements
- FastAPI or equivalent robust routing system exposing strict REST endpoints for each Admin domain.

## 13. QA / Build Status
- `npm run build`: PASS
- TypeScript: PASS
- Hydration: PASS
- Public Isolation: PASS

## 14. Git Commit
- Hash: To be generated on freeze commit.

## 15. Git Tag
- Tag: `sky-interior-admin-v1.0`
