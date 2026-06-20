import axios from 'axios'

const api = axios.create({
  baseURL: '/api/ats',
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
})

export const analyzeCV = async (cvText) => {
  const { data } = await api.post('/analyze', { cvText })
  return data
}

export const uploadAndAnalyze = async (file) => {
  const form = new FormData()
  form.append('cv', file)
  const { data } = await api.post('/upload-cv', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 120000,
  })
  return data
}

export default api
