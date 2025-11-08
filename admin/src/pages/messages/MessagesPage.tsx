import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  MarkEmailRead as ReadIcon,
} from '@mui/icons-material'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../../../amplify/data/resource'
import { format } from 'date-fns'

const client = generateClient<Schema>()

type ContactSubmission = Schema['ContactSubmission']['type']

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      setLoading(true)
      const { data, errors } = await client.models.ContactSubmission.list()

      if (errors) {
        console.error('Errors loading messages:', errors)
        setError('Failed to load messages')
        return
      }

      const sortedMessages = [...data].sort((a, b) => {
        const dateA = new Date(a.submittedAt || 0).getTime()
        const dateB = new Date(b.submittedAt || 0).getTime()
        return dateB - dateA
      })

      setMessages(sortedMessages)
      setError(null)
    } catch (err) {
      console.error('Error loading messages:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleView = (message: ContactSubmission) => {
    setSelectedMessage(message)
    setViewDialogOpen(true)

    // Mark as read if it's new
    if (message.status === 'new') {
      handleMarkAsRead(message.id)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await client.models.ContactSubmission.update({
        id,
        status: 'read',
      })
      loadMessages()
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      await client.models.ContactSubmission.delete({ id })
      loadMessages()
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Failed to delete message')
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Contact Messages
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Messages from your portfolio contact form
          </Typography>
        </Box>
        <Chip
          label={`${messages.filter(m => m.status === 'new').length} new`}
          color="primary"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary" py={4}>
                    No messages yet
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id} hover sx={{ backgroundColor: message.status === 'new' ? 'action.hover' : 'transparent' }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={message.status === 'new' ? 'bold' : 'normal'}>
                      {message.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.subject || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={message.status || 'new'}
                      size="small"
                      color={message.status === 'new' ? 'primary' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    {message.submittedAt
                      ? format(new Date(message.submittedAt), 'MMM dd, yyyy HH:mm')
                      : '-'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleView(message)}
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleMarkAsRead(message.id)}
                      disabled={message.status === 'read'}
                    >
                      <ReadIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(message.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Message Details</DialogTitle>
        <DialogContent>
          {selectedMessage && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                From:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedMessage.name} ({selectedMessage.email})
              </Typography>

              {selectedMessage.subject && (
                <>
                  <Typography variant="subtitle2" color="text.secondary" mt={2}>
                    Subject:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedMessage.subject}
                  </Typography>
                </>
              )}

              <Typography variant="subtitle2" color="text.secondary" mt={2}>
                Message:
              </Typography>
              <Paper sx={{ p: 2, mt: 1, backgroundColor: 'grey.50' }}>
                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                  {selectedMessage.message}
                </Typography>
              </Paper>

              <Typography variant="caption" color="text.secondary" display="block" mt={2}>
                Received: {selectedMessage.submittedAt && format(new Date(selectedMessage.submittedAt), 'MMMM dd, yyyy HH:mm')}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button
            variant="contained"
            href={`mailto:${selectedMessage?.email}?subject=Re: ${selectedMessage?.subject || 'Your message'}`}
          >
            Reply via Email
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
