# API Documentation

## Base URL
```
Development: http://localhost:3000/api/v1
Production: https://your-api-domain.com/api/v1
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Blog Posts

#### Get All Posts
```http
GET /blog
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Post Title",
      "slug": "post-title",
      "excerpt": "Post excerpt...",
      "category": "Cloud Architecture",
      "tags": ["AWS", "Cloud"],
      "published_at": "2025-01-01T00:00:00Z",
      "views": 100
    }
  ]
}
```

#### Get Post by Slug
```http
GET /blog/:slug
```

#### Create Post (Admin Only)
```http
POST /blog
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "title": "New Post",
  "slug": "new-post",
  "excerpt": "Brief description",
  "content": "Full content...",
  "category": "AI & ML",
  "tags": ["AI", "ML"],
  "featured_image": "url"
}
```

### Projects

#### Get All Projects
```http
GET /projects
```

#### Get Project by Slug
```http
GET /projects/:slug
```

#### Create Project (Admin Only)
```http
POST /projects
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "title": "Project Name",
  "slug": "project-name",
  "description": "Full description",
  "short_description": "Brief description",
  "technologies": ["Node.js", "React"],
  "github_url": "https://github.com/...",
  "live_url": "https://...",
  "featured": true
}
```

### Contact

#### Send Contact Message
```http
POST /contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Your message here"
}
```

### Analytics

#### Track Event
```http
POST /analytics/event
Content-Type: application/json

{
  "event_type": "button_click",
  "page_url": "/projects",
  "metadata": {
    "button_id": "contact-btn"
  }
}
```

#### Track Page View
```http
POST /analytics/pageview
Content-Type: application/json

{
  "page_url": "/blog/post-slug"
}
```

#### Get Analytics Stats (Admin Only)
```http
GET /analytics/stats
Authorization: Bearer JWT_TOKEN
```

## Rate Limiting

- General endpoints: 100 requests per 15 minutes
- Auth endpoints: 5 requests per minute

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error
