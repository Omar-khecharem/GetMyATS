import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { interviewChatMessage, uploadAndAnalyze } from '../services/api'

export default function InterviewChat() {
  const [cvText, setCvText] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [speakingIndex, setSpeakingIndex] = useState(null)
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [autoSpeak, setAutoSpeak] = useState(true)
  const [cvSource, setCvSource] = useState('')
  const chatEndRef = useRef(null)
  const recognitionRef = useRef(null)
  const inputRef = useRef(null)
  const messagesRef = useRef(null)

  const isBrowser = typeof window !== 'undefined'
  const SpeechRecognition = isBrowser && (window.SpeechRecognition || window.webkitSpeechRecognition)
  const synth = isBrowser && window.speechSynthesis

  useEffect(() => {
    window.scrollTo(0, 0)
    const stored = sessionStorage.getItem('ats_cv_text')
    if (stored) {
      setCvText(stored)
      setCvSource('stored')
    }

    if (synth) {
      const loadVoices = () => {
        const v = synth.getVoices()
        setVoices(v)
        const en = v.find((voice) => voice.lang.startsWith('en') && voice.localService)
        const first = v.find((voice) => voice.lang.startsWith('en'))
        setSelectedVoice(en || first || v[0] || null)
      }
      loadVoices()
      synth.onvoiceschanged = loadVoices
      return () => { synth.onvoiceschanged = null }
    }
  }, [synth])

  useEffect(() => {
    const el = messagesRef.current
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight
      })
    }
  }, [messages])

  const speak = useCallback((text, index) => {
    if (!synth) return
    synth.cancel()
    if (speakingIndex === index) {
      setSpeakingIndex(null)
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    if (selectedVoice) utterance.voice = selectedVoice
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.onend = () => setSpeakingIndex(null)
    utterance.onerror = () => setSpeakingIndex(null)
    setSpeakingIndex(index)
    synth.speak(utterance)
  }, [synth, selectedVoice, speakingIndex])

  useEffect(() => {
    return () => { if (synth) synth.cancel() }
  }, [synth])

  const startListening = useCallback(() => {
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.continuous = false

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput((prev) => (prev ? prev + ' ' + transcript : transcript))
      setIsListening(false)
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [SpeechRecognition])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [])

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are accepted')
      e.target.value = ''
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await uploadAndAnalyze(file)
      const text = res.data.extractedText
      setCvText(text)
      sessionStorage.setItem('ats_cv_text', text)
      setCvSource('stored')
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to extract CV')
    } finally {
      setLoading(false)
    }
    e.target.value = ''
  }

  const startInterview = async () => {
    if (!cvText.trim()) {
      setError('Please provide your CV text')
      return
    }
    if (!jobDesc.trim()) {
      setError('Please enter a job description')
      return
    }
    setError('')
    setLoading(true)
    setStarted(true)
    const infoText = additionalInfo.trim() ? `\n\nAdditional info from candidate: ${additionalInfo.trim()}` : ''
    const fullJobDesc = jobDesc.trim() + infoText

    try {
      const res = await interviewChatMessage(cvText.trim(), fullJobDesc, [], '')
      setMessages([{ role: 'ai', text: res.data.message }])
      if (autoSpeak) speak(res.data.message, 0)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to start interview')
      setStarted(false)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    const history = messages.reduce((acc, msg, i, arr) => {
      if (msg.role === 'ai' && arr[i + 1]?.role === 'user') {
        acc.push({ question: msg.text, answer: arr[i + 1].text })
      }
      return acc
    }, [])
    if (messages.length > 0) {
      const last = messages[messages.length - 1]
      if (last.role === 'ai') {
        history.push({ question: last.text, answer: userMsg })
      }
    }

    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await interviewChatMessage(cvText.trim(), jobDesc.trim(), history, userMsg)
      const aiMsg = res.data
      const msgIndex = messages.length + 1
      setMessages((prev) => [...prev, { role: 'ai', text: aiMsg.message }])
      if (autoSpeak && !aiMsg.isComplete) {
        setTimeout(() => speak(aiMsg.message, msgIndex), 300)
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const endInterview = () => {
    if (synth) synth.cancel()
    setSpeakingIndex(null)
    setStarted(false)
    setMessages([])
  }

  const getLastAiIndex = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'ai') return i
    }
    return -1
  }

  if (!started) {
    return (
      <div className="min-h-screen pt-28 pb-16">
        <div className="fixed inset-0 geo-grid pointer-events-none" />
        <div className="geo-circle" style={{ width: 280, height: 280, top: '5%', right: '-8%', opacity: 0.05 }} />

        <div className="max-w-3xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink mb-8 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Back to home
          </Link>

          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-ink text-xs font-medium text-ink mb-4">
              <span className="w-1.5 h-1.5 bg-ink" />
              AI INTERVIEW
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
              Practice your <span className="border-b-2 border-ink">interview</span>
            </h1>
            <p className="text-ink-secondary max-w-lg mb-8">
              A realistic AI interviewer that asks questions based on your CV and job description. Use your microphone or type your answers.
            </p>
          </div>

          <div className="frame p-8 md:p-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="geo-dot" style={{ width: 8, height: 8, top: -4, right: 60 }} />
            <div className="geo-dot" style={{ width: 8, height: 8, bottom: -4, left: 60 }} />

            <div className="space-y-5">
              {cvSource === 'stored' && cvText ? (
                <div className="flex items-center justify-between border-2 border-ink p-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    <span className="text-sm text-ink font-medium">CV loaded from your analysis</span>
                  </div>
                  <label className="text-xs text-ink-secondary underline cursor-pointer hover:text-ink transition-colors">
                    Change
                    <input type="file" accept=".pdf" onChange={handleFile} className="hidden" />
                  </label>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Your CV text</label>
                  <textarea
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                    placeholder="Paste your CV text here..."
                    rows={5}
                    className="w-full border-2 border-ink p-4 text-sm text-ink bg-surface outline-none transition-all duration-200 focus:bg-ink/5 resize-y"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Job description</label>
                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the job description you're preparing for..."
                  rows={6}
                  className="w-full border-2 border-ink p-4 text-sm text-ink bg-surface outline-none transition-all duration-200 focus:bg-ink/5 resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                  Additional info <span className="text-ink-muted font-normal">(optional — target company, your notes, etc.)</span>
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="e.g. Applying to Google for a Senior Frontend role. I have 5 years of React experience..."
                  rows={3}
                  className="w-full border-2 border-ink p-4 text-sm text-ink bg-surface outline-none transition-all duration-200 focus:bg-ink/5 resize-y"
                />
              </div>

              {error && (
                <div className="border-2 border-ink p-4 text-sm text-ink bg-ink/5 animate-fade-in">
                  {error}
                </div>
              )}

              <button
                onClick={startInterview}
                disabled={loading}
                className="btn-solid w-full py-3.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="31.4 31.4" strokeLinecap="square" />
                    </svg>
                    Preparing interview...
                  </span>
                ) : (
                  'Start interview'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const lastAiIdx = getLastAiIndex()
  const lastMsg = messages[messages.length - 1]
  const isComplete = lastMsg?.role === 'ai' && lastMsg?.text && messages.filter(m => m.role === 'ai').length >= 2

  return (
    <div className="h-screen bg-canvas overflow-hidden flex flex-col">
      <div className="fixed inset-0 geo-grid pointer-events-none" />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 flex flex-col min-h-0">
        <div className="flex items-center justify-between py-3 shrink-0">
          <Link to="/" className="flex items-center gap-2 text-sm text-ink-secondary hover:text-ink transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Exit
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <span className={`w-2 h-2 rounded-full ${autoSpeak ? 'bg-ink' : 'bg-ink-muted'}`} />
              <button onClick={() => setAutoSpeak(!autoSpeak)} className="hover:text-ink transition-colors">
                Auto-speak
              </button>
            </div>
            {voices.length > 0 && (
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => setSelectedVoice(voices.find((v) => v.name === e.target.value) || voices[0])}
                className="text-xs border-2 border-ink bg-surface px-2 py-1 text-ink outline-none"
              >
                {voices.filter((v) => v.lang.startsWith('en')).map((v) => (
                  <option key={v.name} value={v.name}>{v.name.replace(/[A-Za-z]+ /, '')} ({v.lang})</option>
                ))}
              </select>
            )}
            <button onClick={endInterview} className="text-xs text-ink-muted underline hover:text-ink transition-colors">
              End interview
            </button>
          </div>
        </div>

        <div ref={messagesRef} className="flex-1 overflow-y-auto space-y-5 pr-2 scroll-smooth min-h-0">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`} style={{ animationDelay: '0.05s' }}>
              <div className={`w-9 h-9 border-2 border-ink flex items-center justify-center text-xs font-bold shrink-0 ${msg.role === 'ai' ? 'bg-ink text-white' : 'bg-surface text-ink'}`}>
                {msg.role === 'ai' ? 'AI' : 'You'}
              </div>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block border-2 border-ink p-4 text-sm text-ink text-left ${msg.role === 'user' ? 'bg-ink/5' : 'bg-surface'}`}>
                  {msg.text}
                  {msg.role === 'ai' && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-ink/10">
                      <button
                        onClick={() => speak(msg.text, i)}
                        className={`flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] font-medium transition-colors ${speakingIndex === i ? 'text-ink' : 'text-ink-muted hover:text-ink'}`}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {speakingIndex === i ? (
                            <><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>
                          ) : (
                            <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></>
                          )}
                        </svg>
                        {speakingIndex === i ? 'Stop' : 'Listen'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-9 h-9 border-2 border-ink bg-ink text-white flex items-center justify-center text-xs font-bold shrink-0">AI</div>
              <div className="border-2 border-ink p-4 inline-block">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 border border-ink" style={{ animation: `fadeIn 0.6s ${i * 0.2}s infinite alternate` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {isComplete && !loading && (
            <div className="text-center py-4">
              <button onClick={endInterview} className="btn-outline px-6 py-3 text-sm font-semibold">
                Finish & review feedback
              </button>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {error && (
          <div className="border-2 border-ink p-3 text-sm text-ink bg-ink/5 animate-fade-in mb-3 shrink-0">
            {error}
            <button onClick={() => setError('')} className="ml-3 text-xs underline">Dismiss</button>
          </div>
        )}

        <div className="border-t-2 border-ink pt-3 pb-4 bg-canvas shrink-0">
          <div className="flex gap-3">
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={!SpeechRecognition}
              className={`border-2 border-ink p-3 shrink-0 transition-all duration-200 ${isListening ? 'bg-ink text-white' : 'bg-surface text-ink hover:bg-ink hover:text-white'}`}
              title={isListening ? 'Stop recording' : 'Record answer'}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer... (Enter to send, Shift+Enter for new line)"
              rows={1}
              className="flex-1 border-2 border-ink p-3 text-sm text-ink bg-surface outline-none transition-all duration-200 focus:bg-ink/5 resize-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="btn-solid p-3 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
