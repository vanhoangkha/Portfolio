import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import { Box, Paper, Typography, Container } from '@mui/material'
import { CloudUpload as CloudIcon } from '@mui/icons-material'

export default function LoginPage() {
  const navigate = useNavigate()
  const { authStatus } = useAuthenticator((context) => [context.authStatus])

  useEffect(() => {
    if (authStatus === 'authenticated') {
      navigate('/dashboard', { replace: true })
    }
  }, [authStatus, navigate])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF9900 0%, #146EB4 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <CloudIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Portfolio CMS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to manage your portfolio content
            </Typography>
          </Box>

          {/* Amplify Authenticator */}
          <Authenticator
            socialProviders={[]}
            variation="modal"
            hideSignUp={true}
          />

          {/* Footer */}
          <Box mt={3} textAlign="center">
            <Typography variant="caption" color="text.secondary">
              Powered by AWS Amplify Gen 2
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
