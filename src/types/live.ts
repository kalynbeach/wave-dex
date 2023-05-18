import type { IndexEntity, Index } from '.'

//
// Ableton Live Index Types
//

export type LiveIndex = Index<LiveProject[]> & {
  owner: string
  liveVersion: string
  data: {
    projects: LiveProject[]
  }
}

//
// Ableton Live Types
//

// Base type for all Live entities
export type LiveEntity = IndexEntity & {
  createdAt: Date
  modifiedAt: Date
  path: string
}

// Live files, directories, etc., stored within `Ableton` directory
type LiveData = {
  createdAt: Date
  modifiedAt: Date
  path: string
}

// TODO: Add more & validate
export enum LiveFileExtension {
  Set = '.als',
  Clip = '.alc',
  Device = '.adg',
  Analysis = '.asd',
  Sample = '.wav'
}

type LiveFile = LiveData & {
  type: LiveSet | LiveSample | LiveClip
  fileExtension: LiveFileExtension
  data: any
}

type LiveFolder = LiveData & {
  files?: LiveFile[]
}

export type LiveProject = LiveEntity & LiveFolder & {
  description?: string
  tags?: string[]
  // sets: LiveSet[]
}

export type LiveSet = LiveEntity & {
  desription?: string
  tags?: string[]
}

export type LiveTemplate = LiveSet & {
  version: string
}

export type LiveTrack = LiveEntity & {
  type: 'Group' | 'Audio' | 'Midi'
  clips?: LiveClip[]
  devices?: LiveDevice[]
  samples?: LiveSample[]
  tags?: string[]
}

export type LiveSample = LiveData & {
  type: 'Processed' | 'Recorded'
  sampleRate: number
  bitDepth: number
  duration: number
  tags?: string[]
}

export type LiveClip = LiveData & {
  type: 'Audio' | 'Midi'
}

export type LiveGroove = LiveData & {}

export type LivePreset = LiveData & {
  type: 'Instrument' | 'AudioEffect' | 'MidiEffect'
}

export type LiveDevice = LiveData & {
  type: 'Instrument' | 'AudioEffect' | 'MidiEffect'
  // parameters: LiveParameter[]
}

export type LiveParameter = LiveData & {
  value: number
  min: number
  max: number
  automation: LiveAutomation[]
}

export type LiveAutomation = {
  breakpoints: LiveBreakpoint[]
}

export type LiveBreakpoint = {
  time: number
  value: number
}