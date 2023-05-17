'use client'

import { useState } from 'react'

type Props = {
  label: string,
  value: string,
}

export default function PathSetting({ label, value }: Props) {
  const [path, setPath] = useState(value)

  function handleChange(value: string) {
    console.log(`[PathSetting] handleChange:`, value)
    setPath(value)
  }

  return (
    <div className='p-4 flex flex-col gap-2 border rounded border-neutral-950'>
      <span className='text-xs font-mono'>{label}</span>
      <input 
        type='text'
        value={path}
        onChange={e => handleChange(e.target.value)}
        className='p-2 text-sm font-mono text-neutral-400 bg-neutral-950 border rounded border-neutral-900 transition focus-visible:outline-none focus-visible:border-neutral-700'
      />
    </div>
  )
}