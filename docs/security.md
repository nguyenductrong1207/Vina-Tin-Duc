# Security

## Principles

- **Least privilege** — Public API is read-only
- **Defense in depth** — Multiple security layers
- **Secrets management** — Environment variables, never committed
- **Input validation** — Strapi strict params enabled

## CMS Security

### API Permissions
- Public role: only `find` and `findOne` on published content
- No create, update, delete, publish for anonymous users
- Admin operations require authenticated admin users

### Secrets
All secrets are stored in environment variables:
- `APP_KEYS` — Application encryption
- `ADMIN_JWT_SECRET` — Admin authentication
- `JWT_SECRET` — API authentication
- `API_TOKEN_SALT` — API token generation
- `TRANSFER_TOKEN_SALT` — Data transfer security
- `ENCRYPTION_KEY` — General encryption

**Generate unique values per environment:** `openssl rand -base64 16`

### CORS
Configured in `cms/config/middlewares.ts`:
- Only allows specified origins (frontend URL)
- Configurable via `CORS_ORIGINS` env var

### Upload Security
- Maximum file size: 10MB (configurable)
- Strapi Media Library handles file validation
- No executable files allowed

### Database
- PostgreSQL with credential-based access
- SSL in production (`DATABASE_SSL=true`)
- Connection pooling configured
- No default/weak passwords in production

## Frontend Security

### No Secrets in Client
- No admin tokens in frontend code
- No database credentials exposed
- Only `VITE_` prefixed env vars are bundled
- API URL is the only env var exposed

### XSS Prevention
- React escapes output by default
- `dangerouslySetInnerHTML` only used for CMS rich text (trusted source)
- No user-generated content rendered without sanitization

### API Communication
- Frontend only communicates with public Strapi Content API
- No direct database access
- Error messages do not expose internal state

## Infrastructure Security

### Docker
- PostgreSQL runs in isolated container
- No default passwords in production
- Health checks configured

### Production Recommendations
- Use HTTPS everywhere
- Enable Strapi rate limiting
- Set proper Content-Security-Policy headers
- Enable database SSL
- Regular dependency audits (`pnpm audit`)
- Monitor for vulnerabilities
- Rotate secrets periodically
- Use a reverse proxy (nginx) in production

## Security Checklist

- [ ] All secrets are unique per environment
- [ ] CORS origins are restricted to production domains
- [ ] Public API permissions are minimal (read-only)
- [ ] Database uses strong credentials
- [ ] HTTPS is enforced
- [ ] No `.env` files are committed
- [ ] Dependencies are audited
- [ ] Upload limits are configured
- [ ] Error responses don't leak internals
