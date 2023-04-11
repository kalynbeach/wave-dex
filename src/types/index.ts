export interface BaseEntity {
  id: string
  name: string
  data?: any
}

export interface BaseIndex {
  id: string
  name: string
  version: string
  createdAt: Date
  modifiedAt: Date
  data: {
    [key: string]: BaseEntity[]
  }
}

export interface BaseIndexer {
  initializeIndex(): void
  buildIndex(): void
  saveIndex(index: BaseIndex): void
  writeJson(path: string, output: any[]): void // TODO: Replace this any !!
}