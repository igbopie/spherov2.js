
export interface Peripheral {
  connect(): void
  discoverAllServicesAndCharacteristics(): void
  services: Array<Services>
}

export interface Services {
  uuid: string,
  characteristics: Array<Characteristic>
}

export interface Characteristic {
  uuid: string,

  subscribe(): void
  write(buf: Buffer, notify: boolean): void
  on(eventName: string, fn: (data: Buffer, isNotification: boolean) => void): void
}
