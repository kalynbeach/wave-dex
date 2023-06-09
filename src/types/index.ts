export type IndexEntity = {
  fileExtension: string
  id: string
  name: string
  data?: {
    [key: string]: any
  }
}

export type Index<T extends IndexEntity[]> = {
  id: string
  name: string
  version: string
  createdAt: Date
  modifiedAt: Date
  data: {
    [key: string]: T
  }
}

export interface IndexingStrategy<T extends IndexEntity> {
  fileExtension: string
  index: (rootDirectory: string) => Promise<T[]>
}

export interface IndexerStrategies<T extends IndexEntity> {
  [key: string]: IndexingStrategy<T>
}

export interface Indexer<T extends IndexEntity[]> {
  readonly FILE_EXTENSIONS: {
    [key: string]: string
  }

  config: {
    paths: { [key: string]: string }
    [key: string]: any
  }

  index: Index<T> | null

  // strategies: IndexingStrategy<any>[]
  strategies: IndexerStrategies<IndexEntity>

  // findIndexEntites: <T extends IndexEntity>(rootDirectory: PathLike) => Promise<T[]>
  createIndex: () => Promise<Index<T>>
  getIndex: () => Index<T>
  getIndexValue: (key: string) => Promise<IndexEntity[] | undefined>
  saveIndex: <T extends IndexEntity[]>(index: Index<T>) => Promise<void>
  saveIndexJson: (path: string, output: any[]) => Promise<void>
}

export interface IndexerDatabase {
  getIndex: <T extends IndexEntity[]>(id: string) => Promise<Index<T>>
  getIndexValue: (id: string, key: string) => Promise<IndexEntity[]>
  setIndex: <T extends IndexEntity[]>(index: Index<T>) => Promise<void>
  setIndexValue: (id: string, key: string, value: IndexEntity[]) => Promise<void>
  updateIndexValue: (id: string, key: string, value: IndexEntity[]) => Promise<void>
}