import path from 'path'
import { readdir, stat } from 'fs/promises'
import { BaseIndexer } from '@/types'
import {
  LiveFileExtension,
  LiveIndex,
  LiveProject
} from '@/types/live'

// User directory paths
const LIVE_ROOT_PATH = process.env.LIVE_ROOT_PATH ?? '~/Music/Ableton'
const LIVE_PROJECTS_ROOT_PATH = process.env.LIVE_PROJECTS_ROOT_PATH ?? '~/Music/Ableton/Projects'
const LIVE_USER_LIBRARY_ROOT_PATH = process.env.LIVE_USER_LIBRARY_ROOT_PATH ?? '~/Music/Ableton/User Library'

/**
 * Ableton Live Indexer
 */
class LiveIndexer implements BaseIndexer {
  LIVE_SET_FILE_EXT = LiveFileExtension.Set
  LIVE_CLIP_FILE_EXT = LiveFileExtension.Clip

  liveRootPath: string
  projectsRootPath: string
  userLibraryPath: string
  jsonPath: string = path.resolve(`./json/index.json`)

  constructor(
    liveRootPath: string,
    projectsRootPath: string,
    userLibraryPath: string
  ) {
    console.log('[LiveIndexer] Initializing...')
    this.liveRootPath = path.resolve(liveRootPath)
    this.projectsRootPath = path.normalize(projectsRootPath)
    this.userLibraryPath = path.normalize(userLibraryPath)
    // this.jsonPath = path.join(this.liveRootPath, 'index.json')
  }

  /**
   * Initialize the `LiveIndex`.
   * @returns Promise<LiveIndex>
   */
  async initializeIndex(): Promise<LiveIndex> {
    console.log(`[LiveIndexer initializeIndex] Starting...`)
    // TODO: Check for existing index, get it if it exists
    const index = await this.buildIndex()
    // await this.saveIndex(index)
    return index
  }

  /**
   * Build the `LiveIndex`.
   * @returns Promise<LiveIndex>
   */
  async buildIndex(): Promise<LiveIndex> {
    console.log(`[LiveIndexer buildIndex] Building index...`)
    const projects = await this.getProjects()

    // TEMP: Random 10 digit number
    const id = Math.round(Math.random() * 10000000000).toString()

    const timestamp = new Date()

    return {
      id,
      owner: 'KB', // TEMP
      name: 'live', // TEMP
      liveVersion: '11.2.11', // TEMP
      version: '0.0.1', // TEMP
      createdAt: timestamp,
      modifiedAt: timestamp,
      data: {
        projects
      }
    }
  }

  /**
   * Save the given `LiveIndex` to the database.
   * @param index `LiveIndex` to save
   */
  async saveIndex(index: LiveIndex) {
    // TODO: Update database
  }

  writeJson(path: string = this.jsonPath, output: LiveProject[]) {}

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
            return subEntry.endsWith(this.LIVE_SET_FILE_EXT)
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

  /**
   * Recursively searches through the Live User Library at 
   * `this.userLibraryPath` for `LiveFile` objects and
   * returns them
   */
  async getUserLibrary() {
    // TODO: Implement
  }
}

const indexer = new LiveIndexer(
  LIVE_ROOT_PATH,
  LIVE_PROJECTS_ROOT_PATH,
  LIVE_USER_LIBRARY_ROOT_PATH
)

export default indexer