import { h } from 'preact'
import { useState } from 'preact/hooks'
import FontFaceObserver from 'fontfaceobserver'

import Home from 'routes/Home'

import 'config'

import './styles.scss'
import 'reset-css'

export default function App() {
  const { 0: ready, 1: setReady } = useState(false)
  const MonumentExtendedObserver = new FontFaceObserver('Monument Extended', {
    weight: 400
  })
  MonumentExtendedObserver.load().then(() => setReady(true))

  return (
    <div className="app">
      <div className="router">
        <Home shouldBeVisible={ready} />
      </div>
    </div>
  )
}
