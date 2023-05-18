import LiveSettings from '../app/live/LiveSettings'

export default function Settings() {
  return (
    <div className='w-full p-4 flex flex-col justify-between gap-4 border rounded border-neutral-900'>
      <span className='text-xl font-bold'>Settings</span>
      {/* Path Settings */}
      <LiveSettings />
    </div>
  )
}