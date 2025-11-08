import { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material'
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { uploadData, list, remove, getUrl } from 'aws-amplify/storage'

interface MediaFile {
  key: string
  size?: number
  lastModified?: Date
  url?: string
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    try {
      setLoading(true)
      // List files from blog-images folder
      const result = await list({
        path: 'blog-images/',
      })

      // Get URLs for each file
      const filesWithUrls = await Promise.all(
        result.items.map(async (item) => {
          try {
            const urlResult = await getUrl({
              path: item.path,
              options: {
                expiresIn: 900, // 15 minutes
              },
            })
            return {
              key: item.path,
              size: item.size,
              lastModified: item.lastModified,
              url: urlResult.url.toString(),
            }
          } catch (error) {
            console.error('Error getting URL for', item.path, error)
            return {
              key: item.path,
              size: item.size,
              lastModified: item.lastModified,
            }
          }
        })
      )

      setFiles(filesWithUrls)
      setError(null)
    } catch (err) {
      console.error('Error loading files:', err)
      setError('Failed to load media files')
    } finally {
      setLoading(false)
    }
  }

  const onDrop = async (acceptedFiles: File[]) => {
    setUploading(true)
    setError(null)

    try {
      // Upload files to S3
      for (const file of acceptedFiles) {
        const path = `blog-images/${Date.now()}-${file.name}`
        await uploadData({
          path,
          data: file,
          options: {
            contentType: file.type,
          },
        }).result

        console.log(`Uploaded: ${path}`)
      }

      // Reload files
      await loadFiles()
    } catch (err) {
      console.error('Error uploading files:', err)
      setError('Failed to upload files. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
    },
    multiple: true,
  })

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Delete ${file.key}?`)) return

    try {
      await remove({ path: file.key })
      await loadFiles()
    } catch (error) {
      console.error('Error deleting file:', error)
      alert('Failed to delete file')
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    alert('URL copied to clipboard!')
  }

  const handleView = (file: MediaFile) => {
    setSelectedFile(file)
    setViewDialogOpen(true)
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown'
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Media Library
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your images and media files
          </Typography>
        </Box>
        <Chip label={`${files.length} files`} color="primary" />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Upload Area */}
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          mb: 3,
          textAlign: 'center',
          cursor: 'pointer',
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {uploading
            ? 'Uploading...'
            : isDragActive
            ? 'Drop files here'
            : 'Drag & drop images here, or click to select'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Supports: PNG, JPG, GIF, WebP, SVG
        </Typography>
        {uploading && <CircularProgress sx={{ mt: 2 }} />}
      </Paper>

      {/* Files Grid */}
      {files.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No files uploaded yet. Upload your first image!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {files.map((file) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={file.key}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={file.url || '/placeholder.png'}
                  alt={file.key}
                  sx={{ objectFit: 'cover', backgroundColor: 'grey.200' }}
                />
                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                  <Box>
                    <Typography variant="caption" display="block" noWrap>
                      {file.key.split('/').pop()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatFileSize(file.size)}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleView(file)}>
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => file.url && handleCopyUrl(file.url)}
                      disabled={!file.url}
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(file)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* View Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>View Image</DialogTitle>
        <DialogContent>
          {selectedFile?.url && (
            <Box>
              <img
                src={selectedFile.url}
                alt={selectedFile.key}
                style={{ width: '100%', height: 'auto' }}
              />
              <TextField
                fullWidth
                label="URL"
                value={selectedFile.url}
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button
            variant="contained"
            startIcon={<CopyIcon />}
            onClick={() => selectedFile?.url && handleCopyUrl(selectedFile.url)}
          >
            Copy URL
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
