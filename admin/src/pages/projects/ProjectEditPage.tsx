import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

export default function ProjectEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    category: '',
    technologies: [] as string[],
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    status: 'completed',
  })

  useEffect(() => {
    if (id) {
      loadProject()
    }
  }, [id])

  const loadProject = async () => {
    try {
      setLoading(true)
      const { data, errors } = await client.models.Project.get({ id: id! })

      if (errors || !data) {
        setError('Project not found')
        return
      }

      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        description: data.description || '',
        longDescription: data.longDescription || '',
        category: data.category || '',
        technologies: data.technologies || [],
        imageUrl: data.imageUrl || '',
        githubUrl: data.githubUrl || '',
        liveUrl: data.liveUrl || '',
        featured: data.featured || false,
        status: data.status || 'completed',
      })
    } catch (err) {
      console.error('Error loading project:', err)
      setError('Failed to load project')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!formData.title || !formData.slug || !formData.description) {
        setError('Title, slug, and description are required')
        setSaving(false)
        return
      }

      await client.models.Project.update({
        id: id!,
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        longDescription: formData.longDescription || null,
        category: formData.category || null,
        technologies: formData.technologies.length > 0 ? formData.technologies : null,
        imageUrl: formData.imageUrl || null,
        githubUrl: formData.githubUrl || null,
        liveUrl: formData.liveUrl || null,
        featured: formData.featured,
        status: formData.status,
      })

      navigate('/projects')
    } catch (err) {
      console.error('Error updating project:', err)
      setError('Failed to update project. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Project
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Update project information
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
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Long Description
              </Typography>
              <RichTextEditor
                value={formData.longDescription}
                onChange={(value) => setFormData((prev) => ({ ...prev, longDescription: value }))}
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
                  <TextField {...params} label="Technologies" placeholder="Select technologies" />
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
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Live Demo URL"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
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
                label="Featured project"
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => navigate('/projects')}
                  disabled={saving}
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
