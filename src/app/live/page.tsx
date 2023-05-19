import { liveIndexer } from '@/lib/live/indexer'
import IndexList from '@/app/indexes/IndexList'

async function initIndex() {
  let index = liveIndexer.index
  if (!index) {
    index = await liveIndexer.createIndex()
  }
  return index
}

export default async function Live() {
  let index = await initIndex()

  const projects = index.data.projects
  // console.log(`[Live] projects:`, projects.length)

  return (
    <main className='min-h-screen p-8 flex flex-col'>
      <h1 className='mb-8 text-3xl font-bold'>Live</h1>
      <span className='text-lg'>Projects: { projects.length }</span>
      <IndexList />
      <div className='flex flex-col gap-4 justify-between'>
        {
          projects.map((project, index) => (
            <div key={index} className='p-4 flex flex-row justify-between items-center border border-neutral-800 rounded'>
              <h2 className='text-xl font-bold basis-2/5'>{project.name}</h2>
              <span className='text-xs'>{project.id}</span>
              <span>C: {project.createdAt.toLocaleDateString()}</span>
              <span>M: {project.modifiedAt.toLocaleDateString()}</span>
            </div>
          ))
        }
      </div>
    </main>
  )
}
