export interface ExternalUrls {
  spotify: string
}

export interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface AlbumItem {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_ids: ExternalIds
  external_urls: ExternalUrls
  genres: any[]
  href: string
  id: string
  images: Image[]
  label: string
  name: string
  popularity: number
  release_date: string
  release_date_precision: string
  total_tracks: number
  tracks: Tracks
  type: string
  uri: string
}

export interface Albums {
  href: string
  items: AlbumItem[]
  limit: number
  next: string
  offset: number
  previous?: any
  total: number
}

export interface Album {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface ExternalIds {
  isrc: string
}

export interface TrackItem {
  album: Album
  artists: Artist[]
  available_markets?: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export interface Tracks {
  href: string
  items: TrackItem[]
  limit: number
  next: string
  offset: number
  previous?: any
  total: number
}

export interface SearchResponse {
  albums: Albums
  tracks: Tracks
}
