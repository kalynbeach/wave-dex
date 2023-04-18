'use client'

import { useState } from 'react'

type Props = {
  label: string
}

export default function PathSetting({ label }: Props) {
  const [path, setPath] = useState('')

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
        className='p-2 bg-neutral-950 border rounded border-neutral-950 transition focus-visible:outline-none focus-visible:border-neutral-700'
      />
    </div>
  )
}