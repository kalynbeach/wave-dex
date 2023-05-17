export interface IndexEntity {
  id: string
  name: string
  data?: any
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

export interface Indexer {
  readonly FILE_EXTENSIONS: { [key: string]: string }

  config: {
    paths: { [key: string]: string }
  }

  index: Index

  buildIndex(): Promise<void>

  getIndexValue(key: string): IndexEntity[]
  
  saveIndex(index: Index): Promise<void>
  saveIndexJson(path: string, output: any[]): Promise<void> // TODO: Replace this any !!
}

export interface IndexerDatabase {
  getIndex(id: string): Promise<Index>
  getIndexValue(id: string, key: string): Promise<IndexEntity[]>

  setIndex(index: Index): Promise<void>
  setIndexValue(id: string, key: string, value: IndexEntity[]): Promise<void>

  updateIndexValue(id: string, key: string, value: IndexEntity[]): Promise<void>
}