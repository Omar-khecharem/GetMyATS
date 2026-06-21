import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL: API_BASE + '/api/ats',
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
})

export const analyzeCV = async (cvText) => {
  const { data } = await api.post('/analyze-ai', { cvText })
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

export const matchCVWithJob = async (cvText, jobDescription) => {
  const { data } = await api.post('/match-job', { cvText, jobDescription })
  return data
}

export const enhanceBulletPoint = async (bulletText, context) => {
  const { data } = await api.post('/enhance-bullet', { bulletText, context })
  return data
}

export const generateInterviewPrep = async (cvText, jobDescription) => {
  const { data } = await api.post('/interview-questions', { cvText, jobDescription })
  return data
}

export const interviewChatMessage = async (cvText, jobDescription, history, latestAnswer) => {
  const { data } = await api.post('/interview-chat', { cvText, jobDescription, history, latestAnswer })
  return data
}

export const validatePromo = async (code) => {
  const { data } = await api.post('/validate-promo', { code })
  return data
}

export default api
