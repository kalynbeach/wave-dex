import { liveIndexer } from '@/lib/live/indexer'
import PathSetting from './PathSetting'

export default function LiveSettings() {
  const paths = liveIndexer.paths

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
        <PathSetting label='Live Root' value={paths.liveRoot} />
        {/* - Projects root path */}
        <PathSetting label='Projects Root' value={paths.projectsRoot} />
        {/* - User Library root path */}
        <PathSetting label='User Library Root' value={paths.userLibrary} />
      </section>
    </div>
  )
}