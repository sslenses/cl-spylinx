# CETAK BIRU ARSITEKTUR MONOREPO: EIMAS SaaS v3.0 (Supabase Integration)
*Otomatisasi & Orkestrasi ISP Multi-Tenant berbasis TypeScript Monorepo, Supabase Ecosystem, & Go Hybrid Edge*

---

## 1. STRATEGI WORKSPACE & MONOREPO TOOLING

Mengintegrasikan domain bisnis **ERP (Finance & Inventory)**, **BSS (Billing & Customer)**, **OSS (RADIUS & Device Control)**, dan **CRM (Ticketing & Helpdesk)** ke dalam satu sistem SaaS (Software-as-a-Service) membutuhkan manajemen repositori yang efisien. Kami merekomendasikan penggunaan **Turborepo** (teknologi di luar dokumen EIMAS asli) sebagai Monorepo Manager.

### Mengapa Turborepo?
1. **Zero-Configuration Caching**: Turborepo melakukan *caching* terhadap hasil kompilasi, pengujian, dan *linting*. Jika kode suatu paket tidak berubah, proses *build* berikutnya akan berjalan instan (0 milidetik).
2. **Type-Safe Shareable Packages**: Memungkinkan pembagian skema validasi data dan tipe data database langsung antara backend API dan frontend UI tanpa duplikasi kode.
3. **Single Dependency Management**: Semua pustaka eksternal dikelola di satu tempat (`package.json` di root), meminimalkan ketidaksinkronan versi pustaka antar layanan.

---

## 2. STRUKTUR DIREKTORI & CODE SHARING (MONOREPO LAYOUT)

Berikut adalah desain tata letak repositori (*Monorepo Layout*) EIMAS SaaS yang telah disempurnakan untuk integrasi ekosistem Supabase:

```text
/eimas-saas-monorepo
├── package.json                    # Workspace configurations & root scripts
├── turbo.json                      # Turborepo pipeline configuration
├── /apps                           # Aplikasi yang dideploy (Deployable Applications)
│   ├── /admin-dashboard            # React + Vite SPA (Unified ERP, BSS, OSS, CRM Admin UI)
│   ├── /customer-selfcare          # Next.js PWA Portal (Pelanggan)
│   └── /api-server                 # NestJS / Fastify REST & gRPC Gateway
├── /packages                       # Pustaka internal yang dapat digunakan bersama (Shared Packages)
│   ├── /database                   # Prisma / Drizzle ORM (Koneksi Supabase PostgreSQL + ClickHouse client)
│   ├── /shared-zod                 # Skema validasi & tipe TypeScript otomatis (Zod schemas)
│   ├── /ui                         # Shared UI Components (Tailwind CSS, Radix UI, Shadcn/ui)
│   ├── /tsconfig                   # Konfigurasi TypeScript global
│   └── /eslint-config              # Aturan standarisasi kualitas kode (Linter)
└── /services                       # Layanan sistem level rendah (Low-Level System Services)
    └── /go-edge-agent              # Golang Daemon (Dideploy lokal di sisi router ISP partner)
        ├── /internal/cache         # Embedded BadgerDB / SQLite untuk Cache-and-Forward
        └── /internal/security      # Logika Handshake mTLS & Hardware Fingerprint Verification
```

### Mekanisme Sharing Kode (*Type-Safe Pipeline*)
Dengan pola ini, saat tim backend mengubah skema database di `/packages/database`, Prisma/Drizzle akan menghasilkan *type definitions* baru yang merepresentasikan tabel Supabase PostgreSQL. Tipe ini langsung diimpor oleh `/apps/api-server` (backend) dan `/apps/admin-dashboard` (frontend) secara *real-time*. Keamanan tipe data terjaga penuh dari database hingga ke browser pengguna (*End-to-End Type Safety*).

---

## 3. UNIFIED DASHBOARD & API GATEWAY PROTECTION (FRONTEND REACT + VITE)

Menyatukan keempat modul besar ke dalam satu *unified dashboard* diselesaikan dengan menerapkan pemisahan rute dinamis (*Dynamic Role-Based Routing*) pada **React + Vite SPA**:

```text
                     +---------------------------------------+
                     |    React + Vite Unified Dashboard     |
                     +---------------------------------------+
                                         |
         +-----------------+-------------+-------------+-----------------+
         |                 |                           |                 |
         v                 v                           v                 v
+-----------------+ +-------------------------+ +-------------+ +-----------------+
|   Modul ERP     | |       Modul BSS         | |  Modul OSS  | |   Modul CRM     |
| - Ledger & COA  | | - Invoicing & Payments  | | - RADIUS    | | - Ticketing     |
| - Asset & Stock | | - Subscription Plans    | | - Device ACS| | - Customer Care |
+-----------------+ +-------------------------+ +-------------+ +-----------------+
```

### Penegakan NestJS Gateway & Proteksi API
Meskipun Supabase menyediakan API PostgREST bawaan yang dapat diakses langsung oleh klien melalui `supabase-js`, arsitektur EIMAS SaaS melarang keras mutasi data keuangan (ERP) dan provisi (OSS) dilakukan secara langsung dari frontend klien ke database.
*   **Akses Kontrol Terpusat:** Dashboard Admin (`web-admin`) wajib berkomunikasi ke NestJS (`api-server`) melalui **tRPC** atau REST API terlindungi. NestJS bertindak sebagai *gatekeeper* logika bisnis, penjamin transaksi ACID, pengelola antrean BullMQ, dan hanya menggunakan Supabase sebagai *persistence store*.
*   **Arsitektur Routing & Otorisasi (RBAC):** Menu navigasi dan tombol fungsional disaring di sisi klien menggunakan token JWT Supabase Auth yang membawa klaim peran (*role claims*). Hak akses API dibatasi secara ketat di sisi backend (`api-server`) menggunakan *middleware* otorisasi peran. Jika pengguna dengan peran `Finance` mencoba memicu perintah provisi jaringan (`OSS`), backend akan langsung menolak dengan status HTTP `403 Forbidden`.

---

## 4. PERSISTENCE LAYER: SUPABASE POSTGRESQL & CLICKHOUSE MULTI-TENANCY

Sebagai sistem SaaS, database harus dirancang untuk menampung banyak penyewa (ISP Partner) dengan tingkat isolasi data yang sangat ketat untuk mencegah kebocoran data antar-tenant.

```text
                         +-----------------------------------+
                         |      NestJS API-Server Client     |
                         +-----------------------------------+
                                   |               |
               (Transaction Mode)  |               |  (Bulk Logs / Log Ingestion)
                   Port 6543       v               v
               +-----------------------+       +-----------------------+
               | Supabase Supavisor    |       | ClickHouse Database   |
               | (PostgreSQL Multi-DB) |       | (NAT Logs Retensi     |
               +-----------------------+       |  1 Tahun Multi-Tenant)|
                           |                   +-----------------------+
                           v
               +-----------------------+
               | Row-Level Security    |
               | (RLS via app_metadata)|
               +-----------------------+
```

### A. Supabase Auth & Multi-Tenant JWT Claims
*   **Pengamanan tenant_id:** Setiap kali akun pengguna ISP partner didaftarkan, parameter `tenant_id` (berupa UUID) wajib disisipkan di dalam **`app_metadata`** pada Supabase Auth, bukan di `user_metadata`.
    *   *Mengapa?* `user_metadata` dapat diubah langsung oleh pengguna dari sisi frontend (rawan manipulasi), sedangkan `app_metadata` hanya dapat diubah oleh server backend (`api-server` NestJS) menggunakan *Service Role Key* yang aman di lingkungan *trusted environment*.
*   **Row-Level Security (RLS) di Supabase:**
    Tabel operasional dalam skema PostgreSQL (`bss`, `erp`, `oss`) mengaktifkan RLS dengan mengekstrak `tenant_id` langsung dari JWT token Supabase Auth:
    ```sql
    ALTER TABLE bss.customers ENABLE ROW LEVEL SECURITY;

    CREATE POLICY tenant_isolation_policy ON bss.customers
      FOR ALL
      USING (
        tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::uuid
      );
    ```

### B. Database Connection Pooling via Supavisor
*   **Transaction Mode (Port 6543):** Koneksi dari `api-server` NestJS dan antrean asinkron BullMQ dialirkan melalui proxy pooler internal Supabase (**Supavisor**) pada Port 6543 dengan konfigurasi *Transaction Mode*. Hal ini mencegah kehabisan koneksi (*connection exhaustion*) saat memproses konkurensi tinggi dari ratusan tenant secara simultan.
*   **Session Mode (Port 5432) / Direct Connection:** Digunakan secara eksklusif hanya untuk menjalankan migrasi skema database (`prisma migrate deploy` atau `drizzle-kit push`) di dalam pipeline CI/CD `/packages/database`.

### C. Pembagian Skema Relasional (PostgreSQL) & Analitikal (ClickHouse)
1.  **Skema PostgreSQL Tetap Berlapisan:**
    Sesuai cetak biru EIMAS v2.6, data operasional tetap dipisahkan secara logis ke dalam skema:
    *   `erp`: Untuk data bagan akun (COA), persediaan, jurnal, dan aset.
    *   `bss`: Untuk data pelanggan, tagihan, dan langganan.
    *   `oss`: Untuk manajemen IP, profil kecepatan, dan penugasan teknisi.
2.  **ClickHouse untuk NAT Logs Multi-Tenant:**
    PostgreSQL di Supabase tidak dirancang untuk memproses data log translasi IP (NAT Logs) yang berjumlah miliaran baris. Oleh karena itu, kita tetap menggunakan **ClickHouse** sebagai database pendamping. Untuk skala SaaS, data ClickHouse dipisahkan menggunakan *partition key* berdasarkan kombinasi `(tenant_id, event_date)` guna memastikan kecepatan pencarian log investigasi hukum tetap berada di bawah kisaran detik bagi masing-masing partner ISP.
3.  **Log Ingestion & Backpressure Control:**
    ClickHouse sangat rentan terhadap kegagalan penulisan baris per baris secara *real-time* (*too many active parts error*). Oleh karena itu, diimplementasikan **Vector** atau **Fluent Bit** sebagai agen *log shipper* lokal di sisi ISP. Agen ini mengumpulkan log, melakukan kompresi, dan melakukan *bulk insert* (minimal 10.000 baris atau interval 5 detik) ke ClickHouse Cloud.

### D. Supabase Storage untuk Bukti Kerja Lapangan (OSS & CRM)
Aplikasi lapangan teknisi berbasis Flutter memanfaatkan **Supabase Storage** (S3-Compatible Object Storage) untuk menyimpan dokumen bukti penyelesaian masalah di lapangan (*Proof of Work*), seperti unggahan foto redaman sinyal *Optical Power Meter (OPM)* dan pemindaian barcode modem ONT. Penyimpanan ini terintegrasi secara bawaan dengan kontrol akses RLS Supabase.

---

## 5. HYBRID EDGE ORCHESTRATION (THE GO EDGE AGENT)

Tantangan terbesar sistem SaaS di Cloud adalah melakukan interaksi langsung dengan perangkat keras lokal ISP (Core Router BRAS/BNG dan GenieACS).

### Arsitektur Komunikasi "Cloud-to-Edge" via Tunneling
Untuk mengatasi hal ini, kita menggunakan komponen **Go Edge Agent** yang dipasang di server lokal masing-masing ISP partner:

```text
 [ SaaS Cloud (api-server NestJS) ]
                 ^
                 |  WebSockets Terenkripsi (WSS) / gRPC Tunnel
                 |  (Secure mTLS Handshake & Hardware ID Check)
                 v
 [ Local ISP Server (Go Edge Agent) ]
                 |
         +-------+-------+
         |               |
         v               v
  [ Core Router ]  [ GenieACS (TR-069) ]
   (MikroTik/Cisco)  (CPE Auto-Provisioning)
```

1.  **Inisiasi Koneksi Keluar:** Go Edge Agent di kantor lokal ISP menginisiasi koneksi keluar (*outbound connection*) ke `api-server` SaaS di Cloud melalui protokol **Secure WebSockets (WSS)** atau **gRPC**. Karena koneksi dimulai dari dalam jaringan ISP ke luar (Cloud), **ISP partner tidak perlu membuka port publik pada firewall mereka**.
2.  **mTLS & Token Rotation Security:** Autentikasi agen menggunakan **Mutual TLS (mTLS)** dengan sertifikat klien yang unik, dikombinasikan dengan **Rotated JWT Tokens**. Selama proses *handshake* awal, server Cloud akan memverifikasi kombinasi `tenant_id` dengan *hardware fingerprint* (misalnya ID CPU atau UUID motherboard) dari server lokal ISP guna mencegah pemalsuan (*spoofing*) agen.
3.  **Event-Driven Execution:** Ketika pembayaran tagihan diselesaikan di SaaS Cloud, `api-server` memicu *event* lewat **BullMQ (Redis)**. Worker backend kemudian mengirimkan instruksi provisi melalui terowongan (*tunnel*) WebSockets yang aktif ke Go Edge Agent lokal.
4.  **Resiliensi Offline via "Cache-and-Forward":** Bila koneksi terowongan WSS/gRPC ke Cloud terputus, agen beralih ke mode *cache-and-forward* menggunakan database tertanam lokal (**BadgerDB** atau **SQLite**). Seluruh log transaksi dan log NAT disimpan sementara secara lokal dan secara otomatis akan di-flush ke Cloud secara berurutan segera setelah terowongan koneksi kembali aktif (*auto-reconnect*).
5.  **Eksekusi Lokal:** Go Edge Agent menerima perintah provisi dan melakukan panggilan lokal ke:
    *   **Core Router** via CLI/API untuk perintah CoA disconnect/re-throttle.
    *   **GenieACS** via REST API lokal untuk provisi modem ONT pelanggan.
6.  **Hasil Callback:** Hasil eksekusi dikirimkan kembali ke Cloud untuk memperbarui status aktivasi di modul CRM dan BSS.

---

## 6. ROADMAP DEPLOYMENT & DEVELOPER EXPERIENCE (DX)

Dengan beralih ke arsitektur SaaS Monorepo berbasis Supabase, target peluncuran 6 bulan dapat dieksekusi secara paralel dengan efisiensi tinggi:

*   **Bulan 1-2 (Foundation, Supabase Setup & Monorepo Init):**
    *   Inisialisasi Turborepo workspace.
    *   Setup database Supabase PostgreSQL, pembuatan skema `erp`, `bss`, dan `oss`, serta penulisan kebijakan Row-Level Security (RLS) berbasis `app_metadata`.
    *   Konfigurasi koneksi **Supavisor Port 6543** di dalam `/packages/database` Prisma/Drizzle Client.
    *   Setup NestJS `api-server` dengan integrasi BullMQ & Redis.
*   **Bulan 3-4 (Unified Dashboard & Core Services):**
    *   Pengembangan frontend `admin-dashboard` (React + Vite) yang mengintegrasikan UI ERP, BSS, OSS, dan CRM.
    *   Membatasi mutasi data ERP/BSS agar hanya bisa diakses via NestJS Gateway (memblokir direct PostgREST mutasi dari UI).
    *   Pembuatan ClickHouse client dengan penanganan *backpressure* (Vector/Fluent Bit buffer) untuk menampung log NAT.
*   **Bulan 5 (Edge Agent & Integrasi Jaringan):**
    *   Pembangunan daemon `go-edge-agent` dengan enkripsi mTLS, *hardware verification*, dan database lokal BadgerDB/SQLite (*Cache-and-Forward*).
    *   Integrasi end-to-end provisi router lokal melalui perintah WSS dari Cloud.
    *   Peluncuran aplikasi lapangan teknisi berbasis Flutter (Offline-First) dengan integrasi **Supabase Storage** untuk bukti kerja lapangan.
*   **Bulan 6 (Multi-Tenant Load Testing & Cloud Deployment):**
    *   Pengujian ketahanan database RLS di Supabase dengan beban ratusan tenant simulasi di bawah proxy Supavisor.
    *   Deployment backend NestJS ke Kubernetes (GCP/AWS) dengan konfigurasi High-Availability.

---
*Disclaimer: Dokumen ini mengintegrasikan struktur modul, ClickHouse NAT logs, PostgreSQL multi-schema, rumus spasial, dan alur ZTP asli dari cetak biru EIMAS v2.5/2.6 [6, 9, 13], yang dikombinasikan dengan rekomendasi analitis luar untuk implementasi SaaS Multi-Tenant berbasis TypeScript Monorepo, Prisma/Drizzle ORM, NestJS, BullMQ, Turborepo, arsitektur Go Edge Agent, dan integrasi ekosistem Supabase (Auth, RLS, Supavisor, Storage).*
