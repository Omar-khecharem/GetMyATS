const { execSync, spawn } = require('child_process')

try {
  const result = execSync('netstat -ano | findstr ":3000 "', { encoding: 'utf8', stdio: 'pipe' })
  const lines = result.trim().split('\n')
  for (const line of lines) {
    const parts = line.trim().split(/\s+/)
    const pid = parts[parts.length - 1]
    if (pid && pid !== '0') {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'pipe' })
        console.log(`Killed PID ${pid} on port 3000`)
      } catch {}
    }
  }
} catch {}

const nodemon = spawn('npx.cmd', ['nodemon', 'server.js'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname + '/..',
})

process.on('SIGINT', () => { nodemon.kill(); process.exit() })
process.on('SIGTERM', () => { nodemon.kill(); process.exit() })
