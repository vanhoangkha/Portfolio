import { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material'
import {
  Article as ArticleIcon,
  Work as WorkIcon,
  Visibility as ViewIcon,
  Message as MessageIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../../../amplify/data/resource'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format, subDays } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const client = generateClient<Schema>()

interface DashboardStats {
  totalPosts: number
  totalProjects: number
  totalViews: number
  totalMessages: number
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalProjects: 0,
    totalViews: 0,
    totalMessages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Fetch stats from Amplify Data
      const [posts, projects, contacts] = await Promise.all([
        client.models.BlogPost.list(),
        client.models.Project.list(),
        client.models.ContactSubmission.list(),
      ])

      const totalViews = posts.data.reduce(
        (sum, post) => sum + (post.viewCount || 0),
        0
      )

      setStats({
        totalPosts: posts.data.length,
        totalProjects: projects.data.length,
        totalViews,
        totalMessages: contacts.data.length,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Blog Posts',
      value: stats.totalPosts,
      icon: <ArticleIcon sx={{ fontSize: 40 }} />,
      color: '#FF9900',
    },
    {
      title: 'Projects',
      value: stats.totalProjects,
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      color: '#146EB4',
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: <ViewIcon sx={{ fontSize: 40 }} />,
      color: '#1EC876',
    },
    {
      title: 'Messages',
      value: stats.totalMessages,
      icon: <MessageIcon sx={{ fontSize: 40 }} />,
      color: '#FF6B6B',
    },
  ]

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
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome back! Here's your portfolio overview.
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                borderLeft: `4px solid ${stat.color}`,
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box color={stat.color}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Content Overview
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { name: 'Posts', value: stats.totalPosts },
                { name: 'Projects', value: stats.totalProjects },
                { name: 'Messages', value: stats.totalMessages },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF9900" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Button variant="outlined" fullWidth onClick={() => navigate('/blog/create')}>
                New Blog Post
              </Button>
              <Button variant="outlined" fullWidth onClick={() => navigate('/projects/create')}>
                New Project
              </Button>
              <Button variant="outlined" fullWidth onClick={() => navigate('/media')}>
                Upload Media
              </Button>
              <Button variant="outlined" fullWidth onClick={() => navigate('/messages')}>
                View Messages
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
