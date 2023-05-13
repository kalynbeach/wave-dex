import { liveIndexer } from '@/lib/live/indexer'
import { LiveIndex } from '@/types/live'
import IndexList from 'ui/IndexList'

async function getIndex() {
  return await liveIndexer.initializeIndex()
}

async function getProjects(index: LiveIndex) {
  const projects = index.data.projects
  return projects
}

export default async function Live() {
  const index = await getIndex()
  const projects = await getProjects(index)
  console.log(`[Live] projects:`, projects.length)

  return (
    <main className='min-h-screen p-8 flex flex-col'>
      <h1 className='mb-8 text-3xl font-bold'>Live</h1>
      <IndexList />
      <div className='flex flex-col gap-4 justify-between'>
        {
          projects.map((project, index) => (
            <div key={index} className='p-4 border border-neutral-800 rounded'>
              <h2 className='text-lg font-bold'>{project.name}</h2>
              <span className='text-xs'>{project.id}</span>
              <span>{project.createdAt.toLocaleDateString()}</span>
              <span>{project.modifiedAt.toLocaleDateString()}</span>
            </div>
          ))
        }
      </div>
    </main>
  )
}
