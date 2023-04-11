import { NextResponse } from 'next/server'
import indexer from '@/lib/live/indexer'

export async function GET(request: Request) {
  console.log(`[api/live] Called!`)

  const index = await indexer.initializeIndex()
  
  console.log(`[api/live] Done!`)
  
  return NextResponse.json({ index })
  // return new Response(`Projects: ${projects.length}`)
}
