import type { PathLike } from 'fs'

export interface IndexEntity {
  fileExtension: string
  id: string
  name: string
  data?: {
    [key: string]: any
  }
}

export interface Index {
  id: string
  name: string
  version: string
  createdAt: Date
  modifiedAt: Date
  data: {
    [key: string]: IndexEntity[]
  }
}

export interface IndexingStrategy {
  fileExtension: string
  index: (rootDirectory: PathLike) => Promise<IndexEntity[]>
}

export interface Indexer {
  readonly FILE_EXTENSIONS: {
    [key: string]: string
  }

  config: {
    paths: { [key: string]: string }
    [key: string]: any
  }

  index: Index | null

  strategies: IndexingStrategy[]

  buildIndex: () => Promise<void>
  getIndexValue: (key: string) => Promise<IndexEntity[] | undefined>
  saveIndex: <T>(index: Index) => Promise<void>
  saveIndexJson: (path: string, output: any[]) => Promise<void> // TODO: Replace this any
}

export interface IndexerDatabase {
  getIndex: (id: string) => Promise<Index>
  getIndexValue: (id: string, key: string) => Promise<IndexEntity[]>
  setIndex: (index: Index) => Promise<void>
  setIndexValue: (id: string, key: string, value: IndexEntity[]) => Promise<void>
  updateIndexValue: (id: string, key: string, value: IndexEntity[]) => Promise<void>
}