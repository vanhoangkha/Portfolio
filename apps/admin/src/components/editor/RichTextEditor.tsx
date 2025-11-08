import { useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Box } from '@mui/material'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your content here...',
  height = 400,
}: RichTextEditorProps) {
  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  )

  // Quill formats
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'list',
    'bullet',
    'indent',
    'align',
    'blockquote',
    'code-block',
    'link',
    'image',
    'video',
  ]

  return (
    <Box
      sx={{
        '& .ql-container': {
          minHeight: `${height}px`,
          fontSize: '16px',
          fontFamily: 'inherit',
        },
        '& .ql-editor': {
          minHeight: `${height}px`,
          maxHeight: '600px',
          overflowY: 'auto',
        },
        '& .ql-toolbar': {
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          backgroundColor: '#f5f5f5',
        },
        '& .ql-container': {
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
        },
      }}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </Box>
  )
}
