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
  Chip,
  Autocomplete,
} from '@mui/material'
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../../../amplify/data/resource'
import RichTextEditor from '../../components/editor/RichTextEditor'

const client = generateClient<Schema>()

const commonTechnologies = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'AWS',
  'Docker',
  'Kubernetes',
  'Terraform',
  'Next.js',
  'GraphQL',
  'PostgreSQL',
  'MongoDB',
]

export default function ProjectCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    category: '',
    tags: [] as string[],
    technologies: [] as string[],
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    status: 'completed',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

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
      if (!formData.title || !formData.slug || !formData.description) {
        setError('Title, slug, and description are required')
        setLoading(false)
        return
      }

      await client.models.Project.create({
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        longDescription: formData.longDescription || null,
        category: formData.category || null,
        tags: formData.tags.length > 0 ? formData.tags : null,
        technologies: formData.technologies.length > 0 ? formData.technologies : null,
        imageUrl: formData.imageUrl || null,
        githubUrl: formData.githubUrl || null,
        liveUrl: formData.liveUrl || null,
        featured: formData.featured,
        status: formData.status || 'completed',
      })

      navigate('/projects')
    } catch (err) {
      console.error('Error creating project:', err)
      setError('Failed to create project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Add Project
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Showcase a new project in your portfolio
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

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

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Short Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
                required
                helperText="Brief project summary (displayed in cards)"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Long Description (Optional)
              </Typography>
              <RichTextEditor
                value={formData.longDescription}
                onChange={(value) => setFormData((prev) => ({ ...prev, longDescription: value }))}
                placeholder="Detailed project description with features, challenges, outcomes..."
                height={300}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Web App, Mobile App, Cloud Infrastructure, etc."
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planned">Planned</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={commonTechnologies}
                value={formData.technologies}
                onChange={(_, newValue) =>
                  setFormData((prev) => ({ ...prev, technologies: newValue }))
                }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} key={index} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Technologies"
                    placeholder="Select or type technologies"
                    helperText="Press Enter to add custom technology"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Featured Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.png"
                helperText="Upload to Media Library first, then paste URL"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Live Demo URL"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://project-demo.com"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="featured"
                    checked={formData.featured}
                    onChange={handleSwitchChange}
                  />
                }
                label="Featured project (show on homepage)"
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => navigate('/projects')}
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
