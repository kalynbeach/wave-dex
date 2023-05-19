import Link from 'next/link'

export default function Header() {
  return (
    <header className='sticky top-0 z-10 w-full h-24 p-8 flex flex-row justify-between items-center border-b border-b-neutral-900 bg-black'>
      <Link href='/' className='text-lg font-bold transition hover:text-green-500'>
        <code>wave-dex</code>
      </Link>
      <nav className='flex flex-row flex-shrink'>
        <Link href='/dashboard' className='mr-10 transition hover:text-green-500'>
          <span className='text-sm font-mono'>
            Dashboard
          </span>
        </Link>
        <Link href='/indexes' className='mr-10 transition hover:text-green-500'>
          <span className='text-sm font-mono'>
            Indexes
          </span>
        </Link>
        <Link href='/live' className='mr-10 transition hover:text-green-500'>
          <span className='text-sm font-mono'>
            Live
          </span>
        </Link>
      </nav>
    </header>
  )
}