//
// Ableton Live Types
//

// Base interface for all Live entities
interface LiveEntity {
  id: string
  name: string
  path: string
  // type: string
}

// Live files, directories, etc, stored within `Ableton` directory
interface LiveObject extends LiveEntity {
  createdAt: Date
  modifiedAt: Date
  path: string
}

export interface LiveProject extends LiveObject {
  createdAt: Date
  modifiedAt: Date
  sets: LiveSet[]
}

export interface LiveSet extends LiveObject {
  createdAt: Date
  modifiedAt: Date
}

export interface LiveTemplate extends LiveSet {
  description: string
}

export interface LiveTrack extends LiveEntity {
  type: 'Group' | 'Audio' | 'Midi'
  devices: LiveDevice[]
  clips: LiveClip[]
  samples: LiveSample[]
}

export interface LiveSample extends LiveObject {
  type: 'Processed' | 'Recorded'
  sampleRate: number
  bitDepth: number
  duration: number
}

export interface LiveClip extends LiveObject {

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

export interface LiveGroove extends LiveEntity {}

export interface LivePreset extends LiveEntity {
  type: 'Instrument' | 'AudioEffect' | 'MidiEffect'
}

export interface LiveScene extends LiveEntity {}