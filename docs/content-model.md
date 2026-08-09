# Content Model

## Entity Relationship Diagram

```
┌─────────────────┐     ┌──────────────────┐
│ Product Category │◄────│     Product      │
│                  │ 1:N │                  │
└─────────────────┘     └──────────────────┘

┌─────────────────┐     ┌──────────────────┐
│Article Category  │◄────│     Article      │
│                  │ 1:N │                  │
└─────────────────┘     └──────────────────┘

┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│    Global     │  │   Homepage    │  │     About     │
│  (single)     │  │   (single)    │  │   (single)    │
└───────────────┘  └───────────────┘  └───────────────┘

┌───────────────┐  ┌───────────────────────┐  ┌───────────────┐
│    Contact    │  │ Manufacturing Process  │  │  Certificate  │
│   (single)    │  │    (collection)        │  │ (collection)  │
└───────────────┘  └───────────────────────┘  └───────────────┘

┌───────────────┐
│    Service    │
│ (collection)  │
└───────────────┘
```

## Single Types

### Global Settings
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| companyName | String | Yes | Vietnamese name |
| companyNameEnglish | String | No | English name |
| shortName | String | No | Abbreviated name |
| phone | String | No | Public phone |
| email | Email | No | Public email |
| address | Text | No | Full address |
| website | String | No | Website URL |
| businessHours | Text | No | Working hours |
| socialLinks | Component (repeatable) | No | Social media links |
| logo | Media (single image) | No | Company logo |
| favicon | Media (single image) | No | Browser favicon |
| defaultSeo | Component | No | Default SEO values |

### Homepage
| Field | Type | Notes |
|-------|------|-------|
| hero | Component | Title, subtitle, background image, CTA |
| introduction | Component | Heading, content, image |
| capabilities | Component | Heading + capability items |
| statistics | Component | Heading + statistic items |
| ctaSection | Component | Title, description, CTA, background |
| seo | Component | Page SEO metadata |

### About
| Field | Type | Notes |
|-------|------|-------|
| title | String | Page title |
| description | Text | Short description |
| content | Rich text | Main content |
| images | Media (multiple) | Company images |
| mission | Text | Mission statement |
| vision | Text | Vision statement |
| values | Rich text | Company values |
| milestones | Component (repeatable) | Year + title + description |
| seo | Component | Page SEO |

### Contact
| Field | Type | Notes |
|-------|------|-------|
| title | String | Page title |
| description | Text | Intro text |
| contactInfo | Component | Phone, email, address, map, hours |
| seo | Component | Page SEO |

## Collection Types

### Product
| Field | Type | Notes |
|-------|------|-------|
| name | String | Product name |
| slug | UID (from name) | URL-friendly identifier |
| shortDescription | Text (max 300) | Card excerpt |
| description | Rich text | Full description |
| category | Relation (M:1) | Links to Product Category |
| featured | Boolean | Highlight on homepage |
| images | Media (multiple) | Product photos |
| specifications | Rich text | Technical specs |
| applications | Text | Use cases |
| materials | Text | Material info |
| seo | Component | Product SEO |

### Product Category
| Field | Type | Notes |
|-------|------|-------|
| name | String (unique) | Category name |
| slug | UID (from name) | URL slug |
| description | Text | Category description |
| image | Media (single) | Category image |
| products | Relation (1:M) | Linked products |
| order | Integer | Display order |

### Service
| Field | Type | Notes |
|-------|------|-------|
| title | String | Service name |
| slug | UID (from title) | URL slug |
| description | Text | Short description |
| content | Rich text | Full content |
| image | Media (single) | Service image |
| icon | Media (single) | Service icon |
| featured | Boolean | Show on homepage |
| order | Integer | Display order |
| seo | Component | Service SEO |

### Manufacturing Process
| Field | Type | Notes |
|-------|------|-------|
| title | String | Step title |
| description | Text | Step description |
| content | Rich text | Detailed info |
| order | Integer | Step sequence |
| image | Media (single) | Step image |
| icon | Media (single) | Step icon |

### Article
| Field | Type | Notes |
|-------|------|-------|
| title | String | Article title |
| slug | UID (from title) | URL slug |
| excerpt | Text (max 300) | Card excerpt |
| content | Rich text | Full article |
| coverImage | Media (single) | Cover/thumbnail |
| category | Relation (M:1) | Article category |
| author | String | Author name |
| featured | Boolean | Highlight article |
| seo | Component | Article SEO |

### Article Category
| Field | Type | Notes |
|-------|------|-------|
| name | String (unique) | Category name |
| slug | UID (from name) | URL slug |
| articles | Relation (1:M) | Linked articles |

### Certificate
| Field | Type | Notes |
|-------|------|-------|
| title | String | Certificate title |
| description | Text | Details |
| document | Media (single) | Certificate file/image |
| issueDate | Date | When issued |
| expiryDate | Date | When expires |
| documentType | Enum | certificate, license, registration, award, other |

## Reusable Components

### shared.seo
Used on every public content type for SEO metadata:
metaTitle, metaDescription, keywords, canonicalURL, ogTitle, ogDescription, ogImage, noIndex, noFollow

### shared.cta
Call to action: label, url, variant (primary/secondary/outline), isExternal

### shared.social-link
Social media: platform (enum), url

### shared.section-heading
Section header: title, subtitle, centered

### shared.statistic-item
Stat display: value, label, suffix

### shared.contact-info
Contact block: phone, email, address, mapUrl, latitude, longitude, workingHours

### about.milestone
Timeline entry: year, title, description
