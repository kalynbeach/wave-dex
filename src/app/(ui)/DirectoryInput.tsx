'use client'

export default function DirectoryInput() {

  function filterFiles(files: FileList, fileTypes: string[]): File[] {
    const fileCount = files.length
    let filteredFiles: File[] = []
    for (let i = 0; i < fileCount; i++) {
      let file = files[i]
      if (fileTypes.includes(file.type)) {
        filteredFiles.push(file)
      }
    }
    return filteredFiles
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    let filteredFiles: File[] = []

    if (files) {
      console.log(`[DirectoryInput] File count: `, files.length)
      const fileTypes = ['audio/x-wav']
      filteredFiles = filterFiles(files, fileTypes)
    }

    console.log(`[DirectoryInput] Filtered Files: `, filteredFiles)
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