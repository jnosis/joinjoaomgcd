export interface BaseOptions {
  deviceId: string;
  deviceIds: string[];
  deviceNames?: string;
  text?: string;
  url?: string;
  clipboard?: string;
  file?: string;
  smsnumber?: string;
  smstext?: string;
  smscontactname?: string;
  mmssubject?: string;
  mmsfile?: string;
  mmsurgent?: string;
  callnumber?: string;
  wallpaper?: string;
  lockWallpaper?: string;
  find?: string;
  mediaVolume?: number;
  ringVolume?: number;
  alarmVolume?: number;
  interruptionFilter?: 1 | 2 | 3 | 4;
  say?: string;
  language?: string;
  app?: string;
  appPackage?: string;

  // Notification Fields
  // These fields are meant for notifications created using the Join API.

  title?: string;
  icon?: string;
  smallicon?: string;
  priority?: number;
  vibration?: string;
  dismissOnTouch?: boolean;
  image?: string;
  group?: string;
  sound?: string;
  actions?: string;
}

export type MessageOptions = Omit<BaseOptions, 'deviceIds'>;
export type MessageOptionsWithIds = Omit<BaseOptions, 'deviceId'>;
