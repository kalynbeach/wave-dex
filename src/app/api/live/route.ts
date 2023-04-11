import indexer from '@/lib/live/indexer'

export async function GET(request: Request) {
  console.log(`[api/live] Called!`)
  const projects = await indexer.getProjects()
  console.log(`[api/live] Done!`, projects)
  return new Response(`Projects: ${projects.length}`)
}
