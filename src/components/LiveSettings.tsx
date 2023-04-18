import PathSetting from './PathSetting'

export default function LiveSettings() {
  return (
    <div className='p-4 border rounded border-neutral-950 flex flex-col justify-between gap-4'>
      <span className='text-lg pb-4 border-b border-neutral-950'>
        Ableton Live
      </span>
      <section className='flex flex-col justify-between gap-4'>
        <span className=''>
          Paths
        </span>
        {/* - Live root path */}
        <PathSetting label='Live Root' />
        {/* - Projects root path */}
        <PathSetting label='Projects Root' />
        {/* - User Library root path */}
        <PathSetting label='User Library Root' />
      </section>
    </div>
  )
}