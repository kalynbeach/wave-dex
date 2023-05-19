'use client'

export default function DirectoryInput() {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      console.log(`[DirectoryInput] Files: `, files)
      // TODO: Handle files
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <span className='text-sm font-bold'>
        Directory Select
      </span>

      <div className='w-fit p-4 border border-neutral-900 rounded'>
        {/* @ts-expect-error */}
        <input className='text-sm' type='file' webkitdirectory='true' onChange={handleChange} />
      </div>
    </div>
  )
}