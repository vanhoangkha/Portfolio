import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../../../amplify/data/resource'
import RichTextEditor from '../../components/editor/RichTextEditor'

const client = generateClient<Schema>()

export default function BlogCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    author: 'Kha Van Hoang',
    published: false,
    featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate
      if (!formData.title || !formData.slug || !formData.content) {
        setError('Title, slug, and content are required')
        setLoading(false)
        return
      }

      // Create blog post
      await client.models.BlogPost.create({
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || null,
        content: formData.content,
        category: formData.category || null,
        tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : null,
        author: formData.author,
        published: formData.published,
        featured: formData.featured,
        publishedAt: formData.published ? new Date().toISOString() : null,
      })

      navigate('/blog')
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Failed to create blog post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create Blog Post
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Write a new blog post for your portfolio
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Slug */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Slug (URL)"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                helperText="URL-friendly version of title"
              />
            </Grid>

            {/* Excerpt */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                multiline
                rows={2}
                helperText="Short summary (optional)"
              />
            </Grid>

            {/* Content - Rich Text Editor */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Content *
              </Typography>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                placeholder="Write your blog post content here..."
                height={400}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Cloud Architecture, AI/ML, DevSecOps, etc."
              />
            </Grid>

            {/* Tags */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="aws, kubernetes, terraform (comma-separated)"
              />
            </Grid>

            {/* Author */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Switches */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="published"
                    checked={formData.published}
                    onChange={handleSwitchChange}
                  />
                }
                label="Publish immediately"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="featured"
                    checked={formData.featured}
                    onChange={handleSwitchChange}
                  />
                }
                label="Featured post"
              />
            </Grid>

            {/* Actions */}
            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Post'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => navigate('/blog')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}
