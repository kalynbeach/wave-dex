import path from 'path'
import { readdir, stat } from 'fs/promises'
import { LiveProject } from '@/types/live'

// Constants
const LIVE_SET_FILE_EXTENSION = '.als'

// User Paths
const LIVE_ROOT_PATH = process.env.LIVE_ROOT_PATH ?? '~/Music/Ableton'
const LIVE_PROJECTS_ROOT_PATH = process.env.LIVE_PROJECTS_ROOT_PATH ?? '~/Music/Ableton/Projects'
const LIVE_USER_LIBRARY_ROOT_PATH = process.env.LIVE_USER_LIBRARY_ROOT_PATH ?? '~/Music/Ableton/User Library'

/**
 * Ableton Live Indexer
 */
class LiveIndexer {
  liveRootPath: string
  projectsRootPath: string
  userLibraryPath: string

  constructor(
    liveRootPath: string,
    projectsRootPath: string,
    userLibraryPath: string
  ) {
    console.log('[LiveIndexer] Initializing...')
    this.liveRootPath = path.resolve(liveRootPath)
    this.projectsRootPath = path.normalize(projectsRootPath)
    this.userLibraryPath = path.normalize(userLibraryPath)
  }

  async buildIndex() {}

  /**
   * Recursively searches through `this.projectsRootPath`
   * for Live Project directories and returns them as an 
   * array of `LiveProject` objects.
   * @returns Promise<LiveProject[]>
   */
  async getProjects(): Promise<LiveProject[]> {
    console.log(`[LiveIndexer getProjects] Starting...`)
    const projects: LiveProject[] = []

    // Recursively search for Projects within the root directory
    const findProjects = async (dir: string) => {
      const entries = await readdir(dir)
      const entryPromises = entries.map(async (entry) => {
        const entryPath = path.join(dir, entry)
        const entryStat = await stat(entryPath)

        if (entryStat.isDirectory()) {
          const subDirEntries = await readdir(entryPath)
          const nameIncludesProject = entry.includes('Project')
          const hasLiveSet = subDirEntries.some((subEntry) => {
            return subEntry.endsWith(LIVE_SET_FILE_EXTENSION)
          })

          if (hasLiveSet && nameIncludesProject) {
            projects.push({
              id: `${entryStat.ino}`,
              name: entry,
              createdAt: entryStat.birthtime,
              modifiedAt: entryStat.mtime,
              path: entryPath
            })
          }

          return findProjects(entryPath)
        }
      })

      await Promise.all(entryPromises)
    }

    await findProjects(this.projectsRootPath)
    console.log(`[LiveIndexer getProjects] Done! Projects: ${projects.length}`)
    return projects
  }

  async getUserLibrary() {}
}

const indexer = new LiveIndexer(
  LIVE_ROOT_PATH,
  LIVE_PROJECTS_ROOT_PATH,
  LIVE_USER_LIBRARY_ROOT_PATH
)

export default indexer