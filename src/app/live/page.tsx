import IndexList from 'ui/IndexList'

// async function getIndex() {
//   const res = await fetch(`/api/live`)
//   if (!res.ok) throw new Error('Failed to fetch index')
//   return res.json()
// }

export default async function Live() {
  // const index = await getIndex()
  // console.log(`[Live] index:`, index)

  return (
    <main className='min-h-screen p-8 flex flex-col'>
      <h1 className='mb-8 text-3xl font-bold'>Live</h1>
      <IndexList />
    </main>
  )
}
