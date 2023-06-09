import path from 'path'
import { readdir, stat } from 'fs/promises'
import type { Indexer, IndexEntity, IndexingStrategy, IndexerStrategies } from '@/types'
import { LiveFileExtension, LiveIndex, LiveProject } from '@/types/live'

// User directory paths
const LIVE_ROOT_PATH = process.env.LIVE_ROOT_PATH ?? '~/Music/Ableton'
const LIVE_PROJECTS_ROOT_PATH = process.env.LIVE_PROJECTS_ROOT_PATH ?? '~/Music/Ableton/Projects'
const LIVE_USER_LIBRARY_ROOT_PATH = process.env.LIVE_USER_LIBRARY_ROOT_PATH ?? '~/Music/Ableton/User Library'


class LiveProjectIndexingStrategy implements IndexingStrategy<LiveProject> {

  fileExtension: string = LiveFileExtension.Set

  constructor() {
    console.log('[LiveProjectIndexingStrategy] Constructing...')
  }

  async index(rootDirectory: string): Promise<LiveProject[]> {
    console.log(`[LiveProjectIndexingStrategy index] Starting...`)
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
            return subEntry.endsWith(this.fileExtension)
          })
          if (hasLiveSet && nameIncludesProject) {
            projects.push({
              fileExtension: this.fileExtension,
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
    await findProjects(rootDirectory)
    console.log(`[LiveProjectIndexingStrategy index] Done! Projects: ${projects.length}`)
    return projects
  }
}

let instance: LiveIndexer | null = null

/**
 * Ableton Live Indexer
 */
class LiveIndexer implements Indexer<LiveProject[]> {

  readonly FILE_EXTENSIONS: {
    LIVE_SET: string
    LIVE_CLIP: string
  } = {
    LIVE_SET: LiveFileExtension.Set,
    LIVE_CLIP: LiveFileExtension.Clip
  }

  config: {
    paths: { [key: string]: string }
  } = {
    paths: {
      root: path.resolve(LIVE_ROOT_PATH),
      projects: path.resolve(LIVE_PROJECTS_ROOT_PATH),
      userLibrary: path.resolve(LIVE_USER_LIBRARY_ROOT_PATH),
      json: path.join(LIVE_ROOT_PATH, 'index.json')
    }
  }

  strategies: IndexerStrategies<IndexEntity> = {
    projects: new LiveProjectIndexingStrategy()
  }

  index: LiveIndex | null = null

  constructor() {
    console.log('[LiveIndexer] Constructing...')
    if (!instance) {
      instance = this
    }
    return instance
  }

  get paths() {
    return {
      root: this.config.paths.root,
      projects: this.config.paths.projects,
      userLibrary: this.config.paths.userLibrary
    }
  }

  updatePaths(values: { root: string, projects: string, userLibrary: string }) {
    this.config.paths.root = path.resolve(values.root)
    this.config.paths.projects = path.resolve(values.projects)
    this.config.paths.userLibrary = path.resolve(values.userLibrary)
  }

  /**
   * Build the `LiveIndex`.
   * @returns Promise<LiveIndex>
   */
  async createIndex(): Promise<LiveIndex> {
    console.log(`[LiveIndexer createIndex] Creating index...`)
    // const projects = await this.getProjects()

    const projects = await this.strategies.projects.index(this.config.paths.projects) as LiveProject[]

    // TEMP: Random 10 digit number
    const id = Math.round(Math.random() * 10000000000).toString()

    const timestamp = new Date()

    this.index = {
      id,
      owner: 'KB', // TEMP
      name: 'live', // TEMP
      liveVersion: '11.2.11', // TEMP
      version: '0.0.1', // TEMP
      createdAt: timestamp,
      modifiedAt: timestamp,
      data: {
        projects: projects
      }
    } as LiveIndex
    return this.index
  }

  getIndex(): LiveIndex {
    return this.index as LiveIndex
  }

  async getIndexValue(key: string): Promise<IndexEntity[] | undefined> {
    return undefined
  }

  /**
   * Save the given `LiveIndex` to the database.
   * @param index `LiveIndex` to save
   */
  async saveIndex<LiveIndex>(index: LiveIndex): Promise<void> {
    // TODO: Update databases
    return new Promise((resolve, reject) => {})
  }

  saveIndexJson(path: string = this.config.paths.json, output: LiveProject[]): Promise<void> {
    return new Promise((resolve, reject) => {})
  }

  /**
   * Recursively searches through `this.projectsRootPath`
   * for Live Project directories and returns them as an 
   * array of `LiveProject` objects.
   * @returns Promise<LiveProject[]>
   */
  // async getProjects(): Promise<LiveProject[]> {
  //   console.log(`[LiveIndexer getProjects] Starting...`)
  //   const projects: LiveProject[] = []

  //   // Recursively search for Projects within the root directory
  //   const findProjects = async (dir: string) => {
  //     const entries = await readdir(dir)
  //     const entryPromises = entries.map(async (entry) => {
  //       const entryPath = path.join(dir, entry)
  //       const entryStat = await stat(entryPath)

  //       if (entryStat.isDirectory()) {
  //         const subDirEntries = await readdir(entryPath)
  //         const nameIncludesProject = entry.includes('Project')
  //         const hasLiveSet = subDirEntries.some((subEntry) => {
  //           return subEntry.endsWith(this.FILE_EXTENSIONS.LIVE_SET)
  //         })

  //         if (hasLiveSet && nameIncludesProject) {
  //           projects.push({
  //             fileExtension: this.FILE_EXTENSIONS.LIVE_SET,
  //             id: `${entryStat.ino}`,
  //             name: entry,
  //             createdAt: entryStat.birthtime,
  //             modifiedAt: entryStat.mtime,
  //             path: entryPath
  //           })
  //         }

  //         return findProjects(entryPath)
  //       }
  //     })

  //     await Promise.all(entryPromises)
  //   }

  //   await findProjects(this.config.paths.projects)
  //   console.log(`[LiveIndexer getProjects] Done! Projects: ${projects.length}`)
  //   return projects
  // }

  /**
   * Recursively searches through the Live User Library at 
   * `this.userLibraryPath` for `LiveFile` objects and
   * returns them
   */
  async getUserLibrary() {
    // TODO: Implement
  }
}

export const liveIndexer = new LiveIndexer()