# Hướng dẫn cài đặt và chạy dự án chi tiết

## Thông tin dự án

| Thông tin | Chi tiết |
|-----------|----------|
| **Tên dự án** | VINA TIN DUC Corporate Website |
| **Công ty** | CÔNG TY TNHH VINA TÍN ĐỨC |
| **Tên tiếng Anh** | VINA TIN DUC COMPANY LIMITED |
| **Tên viết tắt** | VINA TIN DUC CO., LTD |
| **Repository** | https://github.com/nguyenductrong1207/Vina-Tin-Duc |
| **Kiến trúc** | Monorepo (pnpm workspace) |
| **CMS** | Strapi 5.51.2 (TypeScript, PostgreSQL) |
| **Frontend** | React 19, Vite 6, TypeScript 5.7 |
| **Package Manager** | pnpm 10+ |
| **Node.js** | >= 22 (LTS) |
| **Database** | PostgreSQL 17 (Docker) |

---

## Cấu trúc thư mục

```
Vina-Tin-Duc/
├── cms/                      # Strapi 5 CMS (Headless)
│   ├── config/               # Cấu hình server, database, middleware
│   ├── src/
│   │   ├── api/              # Content types (schema, controller, route, service)
│   │   └── components/       # Strapi reusable components
│   ├── .env.example          # Mẫu biến môi trường CMS
│   └── package.json
├── web/                      # React Frontend
│   ├── src/
│   │   ├── app/              # App shell (router, providers, config)
│   │   ├── components/       # UI components + motion components
│   │   ├── features/         # Feature modules (home, products, services...)
│   │   ├── layouts/          # Page layouts
│   │   ├── pages/            # Route page components
│   │   ├── services/api/     # API client, endpoints, mappers
│   │   ├── styles/           # Design tokens, global CSS
│   │   └── types/            # TypeScript type definitions
│   ├── .env.example          # Mẫu biến môi trường Frontend
│   └── package.json
├── docs/                     # Tài liệu dự án
├── scripts/                  # Scripts tiện ích (seed data)
├── docker-compose.yml        # PostgreSQL container
├── .env.example              # Mẫu biến môi trường root (Docker)
├── pnpm-workspace.yaml       # Workspace config
├── package.json              # Root scripts
└── pnpm-lock.yaml            # Lock file (QUAN TRỌNG - commit cùng repo)
```

---

## Yêu cầu hệ thống

### Phần mềm cần cài đặt

| Phần mềm | Phiên bản | Link tải | Ghi chú |
|-----------|-----------|----------|---------|
| **Node.js** | >= 22.x LTS | https://nodejs.org/ | Chọn bản LTS |
| **pnpm** | >= 10.x | `npm install -g pnpm` | Sau khi cài Node |
| **Docker Desktop** | Latest | https://www.docker.com/products/docker-desktop/ | Cho PostgreSQL |
| **Git** | Latest | https://git-scm.com/ | Quản lý source |

### Kiểm tra phiên bản

```bash
node --version    # Phải >= v22.x.x
pnpm --version    # Phải >= 10.x.x
docker --version  # Bất kỳ bản mới
git --version     # Bất kỳ bản mới
```

### Hệ điều hành hỗ trợ

- Windows 10/11 (đã test)
- macOS
- Linux (Ubuntu, Debian)

---

## Cài đặt lần đầu (Step by step)

### Bước 1: Clone repository

```bash
git clone https://github.com/nguyenductrong1207/Vina-Tin-Duc.git
cd Vina-Tin-Duc
```

### Bước 2: Tạo file biến môi trường

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
Copy-Item cms/.env.example cms/.env
Copy-Item web/.env.example web/.env
```

**macOS/Linux:**
```bash
cp .env.example .env
cp cms/.env.example cms/.env
cp web/.env.example web/.env
```

### Bước 3: Cấu hình biến môi trường CMS

Mở file `cms/.env` và **thay đổi các giá trị secret** (BẮT BUỘC cho production, khuyến khích cho dev):

```env
# Server
HOST=0.0.0.0
PORT=1337

# Security Keys — PHẢI THAY ĐỔI cho production
# Tạo bằng lệnh: node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=random-string-here
ADMIN_JWT_SECRET=random-string-here
TRANSFER_TOKEN_SALT=random-string-here
JWT_SECRET=random-string-here

# Database — phải khớp với docker-compose.yml
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=vina_tin_duc
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password
DATABASE_SSL=false

# CORS — URL frontend
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Upload
UPLOAD_SIZE_LIMIT=10485760
```

> **Lưu ý:** Cho local development, giá trị mặc định trong `.env.example` là đủ dùng. Chỉ cần thay đổi khi deploy production.

### Bước 4: Khởi động Docker (PostgreSQL)

```bash
docker compose up -d
```

Kiểm tra container đang chạy:
```bash
docker compose ps
```

Kết quả mong đợi:
```
NAME               STATUS          PORTS
vina-tin-duc-db    Up (healthy)    0.0.0.0:5432->5432/tcp
```

**Nếu gặp lỗi:** Docker Desktop phải đang chạy. Mở Docker Desktop trước rồi thử lại.

### Bước 5: Cài đặt dependencies

```bash
pnpm install
```

Lệnh này sẽ cài đặt dependencies cho cả CMS và Frontend (workspace).

> **Lưu ý:** Lần đầu cài có thể mất 1-3 phút tùy mạng.

### Bước 6: Khởi động CMS (Strapi)

```bash
pnpm cms:dev
```

**Lần chạy đầu tiên:**
- Strapi sẽ tạo database tables tự động
- Strapi build admin panel (mất ~30 giây)
- Mở browser tại: `http://localhost:1337/admin`
- **Tạo tài khoản admin** (email + password mạnh)

> **Ghi nhớ email và password** — cần dùng cho seed data và quản lý nội dung.

### Bước 7: Cấu hình API Permissions

**RẤT QUAN TRỌNG** — Không làm bước này thì frontend sẽ không lấy được data.

1. Đăng nhập Strapi Admin: `http://localhost:1337/admin`
2. Vào **Settings** (biểu tượng bánh răng)
3. Cuộn xuống tìm phần **USERS & PERMISSIONS PLUGIN**
4. Click **Roles** → Click **Public**
5. Trong danh sách content types, mở từng mục và bật:

| Content Type | Permissions |
|---|---|
| About | `find` |
| Article | `find`, `findOne` |
| Article-category | `find`, `findOne` |
| Certificate | `find`, `findOne` |
| Contact | `find` |
| Global | `find` |
| Homepage | `find` |
| Manufacturing-process | `find`, `findOne` |
| Product | `find`, `findOne` |
| Product-category | `find`, `findOne` |
| Service | `find`, `findOne` |

6. Click **Save** (góc trên phải)

> **Lưu ý:** Đây là phần **USERS & PERMISSIONS PLUGIN → Roles**, KHÔNG PHẢI phần **ADMINISTRATION PANEL → Roles**. Hai phần này khác nhau hoàn toàn.

### Bước 8: Seed dữ liệu mẫu (Tuỳ chọn)

Nếu muốn có sẵn nội dung mẫu cho website:

```bash
node scripts/seed.mjs <admin-email> <admin-password>
```

Ví dụ:
```bash
node scripts/seed.mjs admin@example.com MyPassword123
```

Script sẽ tạo:
- Global Settings (thông tin công ty)
- Homepage (hero, giới thiệu, năng lực, thống kê, CTA)
- About (lịch sử, sứ mệnh, tầm nhìn, giá trị)
- Contact (địa chỉ, điện thoại, email, giờ làm việc)
- 5 Products (sản phẩm nhựa mẫu)
- 4 Product Categories
- 5 Services
- 7 Manufacturing Process steps
- 3 Articles (tin tức)
- 3 Article Categories
- 1 Certificate

### Bước 9: Khởi động Frontend

Mở terminal **MỚI** (giữ Strapi chạy ở terminal cũ):

```bash
pnpm web:dev
```

Frontend chạy tại: `http://localhost:5173`

---

## Các lệnh thường dùng

### Workspace (Root)

| Lệnh | Mô tả |
|-------|--------|
| `pnpm install` | Cài đặt tất cả dependencies |
| `pnpm cms:dev` | Chạy Strapi dev mode |
| `pnpm cms:build` | Build Strapi production |
| `pnpm cms:start` | Chạy Strapi production |
| `pnpm web:dev` | Chạy frontend dev server |
| `pnpm web:build` | Build frontend production |
| `pnpm web:lint` | Kiểm tra code style |
| `pnpm web:typecheck` | Kiểm tra TypeScript |
| `pnpm web:test` | Chạy unit tests |
| `pnpm docker:up` | Khởi động PostgreSQL |
| `pnpm docker:down` | Tắt PostgreSQL |

### Docker

| Lệnh | Mô tả |
|-------|--------|
| `docker compose up -d` | Khởi động PostgreSQL background |
| `docker compose down` | Tắt PostgreSQL |
| `docker compose ps` | Xem trạng thái containers |
| `docker compose logs postgres` | Xem logs database |
| `docker compose down -v` | Xóa database (CẢNH BÁO: mất data) |

---

## Ports sử dụng

| Service | Port | URL |
|---------|------|-----|
| Frontend (Vite) | 5173 | http://localhost:5173 |
| CMS (Strapi) | 1337 | http://localhost:1337 |
| Strapi Admin | 1337 | http://localhost:1337/admin |
| PostgreSQL | 5432 | localhost:5432 |

---

## Biến môi trường chi tiết

### Root `.env`

```env
POSTGRES_USER=strapi          # Username PostgreSQL
POSTGRES_PASSWORD=strapi_password  # Password PostgreSQL
POSTGRES_DB=vina_tin_duc      # Tên database
POSTGRES_PORT=5432            # Port PostgreSQL
```

### CMS `cms/.env`

```env
HOST=0.0.0.0                  # Strapi listen address
PORT=1337                     # Strapi port

# Security keys (4 keys ngăn cách bằng dấu phẩy)
APP_KEYS=key1,key2,key3,key4

# JWT secrets
API_TOKEN_SALT=xxx            # Salt cho API token
ADMIN_JWT_SECRET=xxx          # Secret cho admin JWT
TRANSFER_TOKEN_SALT=xxx       # Salt cho transfer token
JWT_SECRET=xxx                # Secret cho user JWT

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=vina_tin_duc
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password
DATABASE_SSL=false            # true cho production

# CORS
CORS_ORIGINS=http://localhost:5173

# Upload
UPLOAD_SIZE_LIMIT=10485760    # 10MB
```

### Frontend `web/.env`

```env
VITE_API_URL=http://localhost:1337    # URL của Strapi API
VITE_SITE_NAME=VINA TIN DUC          # Tên site (fallback SEO)
```

---

## Xử lý lỗi thường gặp

### 1. `ECONNREFUSED 127.0.0.1:5432`

**Nguyên nhân:** PostgreSQL chưa chạy.

**Giải pháp:**
```bash
docker compose up -d
# Đợi 5 giây
pnpm cms:dev
```

### 2. `unable to get image 'postgres:17-alpine'`

**Nguyên nhân:** Docker Desktop chưa khởi động.

**Giải pháp:** Mở Docker Desktop, đợi nó sẵn sàng (icon ổn định), rồi thử lại.

### 3. Frontend hiện "Không thể tải nội dung trang chủ"

**Nguyên nhân:** API permissions chưa được cấu hình.

**Giải pháp:** Làm lại Bước 7 (Cấu hình API Permissions) ở trên.

### 4. Trang Services/Manufacturing Process không hiện data

**Nguyên nhân:** Thiếu permission `find` cho content type đó.

**Giải pháp:**
1. Strapi Admin → Settings → USERS & PERMISSIONS PLUGIN → Roles → Public
2. Tìm content type bị thiếu
3. Bật `find` và `findOne`
4. Save

### 5. `pnpm: command not found`

**Giải pháp:**
```bash
npm install -g pnpm
```

### 6. Node version không đúng

**Giải pháp:**
```bash
# Dùng nvm (Node Version Manager)
nvm install 22
nvm use 22
```

### 7. Port 5432 đã bị chiếm

**Nguyên nhân:** Có PostgreSQL khác đang chạy.

**Giải pháp:** Đổi port trong `.env` và `docker-compose.yml`:
```env
POSTGRES_PORT=5433
```
Và cập nhật `cms/.env`:
```env
DATABASE_PORT=5433
```

### 8. Strapi build lỗi TypeScript

**Giải pháp:** Xóa cache và rebuild:
```bash
# Windows
Remove-Item -Recurse -Force cms/.cache, cms/dist
pnpm cms:dev
```

---

## Workflow phát triển hàng ngày

```bash
# 1. Mở Docker
docker compose up -d

# 2. Terminal 1: CMS
pnpm cms:dev

# 3. Terminal 2: Frontend
pnpm web:dev

# 4. Làm việc...
# - Sửa frontend: web/src/
# - Thêm nội dung: http://localhost:1337/admin
# - Xem kết quả: http://localhost:5173

# 5. Trước khi commit
pnpm web:lint
pnpm web:typecheck
pnpm web:test
```

---

## Thêm nội dung mới qua CMS

1. Truy cập `http://localhost:1337/admin`
2. Đăng nhập bằng tài khoản admin
3. Vào **Content Manager** (menu trái)
4. Chọn content type cần sửa
5. Thêm/sửa nội dung
6. Click **Publish** (phải publish thì frontend mới thấy)
7. Refresh frontend

---

## Deploy production (Tóm tắt)

### Frontend
```bash
cd web
pnpm build
# Output: web/dist/ → deploy lên CDN/nginx
```

### CMS
```bash
cd cms
pnpm build
pnpm start
# Cần PostgreSQL production + env vars production
```

Xem chi tiết tại: `docs/deployment.md`

---

## Tech Stack chi tiết

| Layer | Technology | Version | Mục đích |
|-------|-----------|---------|----------|
| CMS | Strapi | 5.51.2 | Headless CMS, REST API |
| Database | PostgreSQL | 17 | Lưu trữ dữ liệu |
| Frontend | React | 19 | UI rendering |
| Build | Vite | 6 | Dev server + bundler |
| Language | TypeScript | 5.7 | Type safety |
| Routing | React Router | 7 | Client-side routing |
| State | TanStack Query | 5 | Server state, caching |
| SEO | react-helmet-async | 3 | Document head management |
| Animation | motion/react | 12 | Scroll animations, transitions |
| Styling | CSS Modules | - | Scoped component styles |
| Lint | ESLint | 9 | Code quality |
| Format | Prettier | - | Code formatting |
| Test | Vitest | 2.1 | Unit/integration tests |
| Container | Docker Compose | - | Local PostgreSQL |
| CI/CD | GitHub Actions | - | Automated checks |

---

## Liên hệ & Tài khoản

| Thông tin | Giá trị |
|-----------|---------|
| GitHub Repo | https://github.com/nguyenductrong1207/Vina-Tin-Duc |
| Strapi Admin (local) | http://localhost:1337/admin |
| Frontend (local) | http://localhost:5173 |
| Admin Email (dev) | ductrong12072002@gmail.com |
| Owner | Nguyễn Đức Trọng |
