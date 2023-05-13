import { BaseEntity, BaseIndex } from '.'

//
// Ableton Live Index Types
//

export interface LiveIndex extends BaseIndex {
  owner: string
  liveVersion: string
  data: {
    projects: LiveProject[]
  }
}

//
// Ableton Live Types
//

// Base interface for all Live entities
export interface LiveEntity extends BaseEntity {}

// Live files, directories, etc., stored within `Ableton` directory
interface LiveData extends LiveEntity {
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

interface LiveFile extends LiveData {
  type: LiveSet | LiveSample | LiveClip
  extension: LiveFileExtension
  data: any
}

interface LiveFolder extends LiveData {
  files?: LiveFile[]
}

export interface LiveProject extends LiveFolder {
  description?: string
  tags?: string[]
  // sets: LiveSet[]
}

export interface LiveSet extends LiveData {
  desription?: string
  tags?: string[]
}

export interface LiveTemplate extends LiveSet {
  version: string
}

export interface LiveTrack extends LiveEntity {
  type: 'Group' | 'Audio' | 'Midi'
  clips?: LiveClip[]
  devices?: LiveDevice[]
  samples?: LiveSample[]
  tags?: string[]
}

export interface LiveSample extends LiveData {
  type: 'Processed' | 'Recorded'
  sampleRate: number
  bitDepth: number
  duration: number
  tags?: string[]
}

export interface LiveClip extends LiveData {
  type: 'Audio' | 'Midi'
}

export interface LiveGroove extends LiveEntity {}

export interface LivePreset extends LiveEntity {
  type: 'Instrument' | 'AudioEffect' | 'MidiEffect'
}

export interface LiveDevice extends LiveEntity {
  type: 'Instrument' | 'AudioEffect' | 'MidiEffect'
  // parameters: LiveParameter[]
}

export interface LiveParameter extends LiveEntity {
  value: number
  min: number
  max: number
  automation: LiveAutomation[]
}

export interface LiveAutomation {
  breakpoints: LiveBreakpoint[]
}

export interface LiveBreakpoint {
  time: number
  value: number
}