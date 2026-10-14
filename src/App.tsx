import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import './App.css'

const sampleWorks = [
  { id: 1, type: 'ANIME', title: '葬送のフリーレン', status: '未着手' },
  { id: 2, type: 'MANGA', title: 'ダンジョン飯', status: '読書中' },
]

const statusOptions = ['すべて', '未着手', '視聴中', '読書中', '完了']

function App() {
  const [works, setWorks] = useState(sampleWorks)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('すべて')
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newType, setNewType] = useState('ANIME')
  const [newStatus, setNewStatus] = useState('未着手')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const filteredWorks = works.filter((work) =>
    work.title.toLowerCase().includes(query.toLowerCase()) &&
    (status === 'すべて' || work.status === status),
  )

  const handleAddWork = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = newTitle.trim()
    if (!title) return

    setWorks((currentWorks) => [
      ...currentWorks,
      { id: Date.now(), type: newType, title, status: newStatus },
    ])
    setNewTitle('')
    setNewType('ANIME')
    setNewStatus('未着手')
    setIsRegisterOpen(false)
    setSnackbarMessage(`${title}をコレクションに登録しました`)
  }

  return (
    <div className="app-shell">
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: '1px solid rgba(148, 163, 184, 0.16)',
          backgroundColor: 'rgba(15, 23, 42, 0.84)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div className="app-bar-content">
          <div>
            <p className="eyebrow">COLLECTION MANAGER</p>
            <h1>Otaku Shelf</h1>
          </div>
          <p className="app-bar-status">アニメ・漫画コレクション</p>
        </div>
      </AppBar>

      <main className="app-content">
        <section className="welcome-panel">
          <p className="eyebrow">YOUR LIBRARY</p>
          <h2>好きな作品を、ひとつの棚に。</h2>
          <p>
            作品の登録、進捗、評価をまとめて管理できるコレクションを作ります。
          </p>
        </section>

        <section className="collection-preview" aria-labelledby="collection-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COLLECTION PREVIEW</p>
              <h2 id="collection-heading">コレクション</h2>
            </div>
            <div className="section-actions">
              <span className="collection-count">全 {works.length}作品</span>
              <Button
                variant="contained"
                onClick={() => setIsRegisterOpen(true)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#7c3aed',
                  '&:hover': { backgroundColor: '#6d28d9' },
                }}
              >
                作品を登録
              </Button>
            </div>
          </div>
          <TextField
            label="作品を検索"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            fullWidth
            sx={{
              maxWidth: 520,
              marginBottom: 3,
              '& .MuiInputBase-root': {
                color: '#f8fafc',
                backgroundColor: 'rgba(30, 41, 59, 0.78)',
              },
              '& .MuiInputLabel-root': { color: '#94a3b8' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(148, 163, 184, 0.28)',
              },
            }}
          />
          <Select
            native
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            inputProps={{ 'aria-label': 'ステータスで絞り込み' }}
            sx={{
              width: 180,
              marginBottom: 3,
              marginLeft: { xs: 0, sm: 2 },
              color: '#f8fafc',
              backgroundColor: 'rgba(30, 41, 59, 0.78)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(148, 163, 184, 0.28)',
              },
              '& .MuiSvgIcon-root': { color: '#cbd5e1' },
            }}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <div className="work-grid">
            {filteredWorks.map((work) => (
              <Card
                component="article"
                key={work.id}
                sx={{
                  padding: 3,
                  border: '1px solid rgba(148, 163, 184, 0.16)',
                  borderRadius: 3,
                  backgroundColor: 'rgba(30, 41, 59, 0.78)',
                  color: '#f8fafc',
                  boxShadow: '0 20px 45px rgba(2, 6, 23, 0.24)',
                }}
              >
                <p className="card-type">{work.type}</p>
                <h3>{work.title}</h3>
                <p className="card-status">{work.status} · サンプルデータ</p>
              </Card>
            ))}
          </div>
          {filteredWorks.length === 0 && (
            <p className="empty-message">該当する作品がありません。</p>
          )}
        </section>
      </main>

      <Dialog
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            padding: 3,
            borderRadius: 3,
            backgroundColor: '#1e293b',
            color: '#f8fafc',
          },
        }}
      >
        <form onSubmit={handleAddWork}>
          <p className="eyebrow">ADD TO COLLECTION</p>
          <h2 className="dialog-heading">作品を登録</h2>
          <TextField
            autoFocus
            required
            label="作品タイトル"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            fullWidth
            sx={{
              marginBottom: 2,
              '& .MuiInputBase-root': { color: '#f8fafc' },
              '& .MuiInputLabel-root': { color: '#94a3b8' },
            }}
          />
          <label className="native-field">
            種別
            <select value={newType} onChange={(event) => setNewType(event.target.value)}>
              <option value="ANIME">アニメ</option>
              <option value="MANGA">漫画</option>
            </select>
          </label>
          <label className="native-field">
            ステータス
            <select value={newStatus} onChange={(event) => setNewStatus(event.target.value)}>
              {statusOptions.slice(1).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <div className="dialog-actions">
            <Button color="inherit" onClick={() => setIsRegisterOpen(false)}>
              キャンセル
            </Button>
            <Button type="submit" variant="contained">
              登録する
            </Button>
          </div>
        </form>
      </Dialog>
      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
      />
    </div>
  )
}

export default App
