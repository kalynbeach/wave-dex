import DashboardMain from './DashboardMain'
import Settings from 'ui/Settings'

export default function Dashboard() {
  return (
    <main className='min-h-screen p-8 flex flex-col gap-4'>
      <h1 className='mb-8 text-3xl font-bold'>Dashboard</h1>
      <DashboardMain />
      <Settings />
    </main>
  )
}
