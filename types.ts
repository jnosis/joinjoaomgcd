/** These fields are meant for notifications created using the Join API. */
export interface NotificationFields {
  /** If used, will always create a notification on the receiving device with
   * this as the title and text as the notification’s text */
  title?: string;
  /** If a notification is created on the receiving device and this is set,
   * then it’ll be used as the notification’s icon. If this image has
   * transparency, it’ll also be used as the status bar icon is smallicon is
   * not set. It’ll also be used to tint the notification with its dominating
   * color */
  icon?: string;
  /** If a notification is created on the receiving device and this is set,
   * then it’ll be used as the notification’s status bar icon */
  smallicon?: string;
  /** control how your notification is displayed: lower priority notifications
   * are usually displayed lower in the notification list.
   * Values from -2 (lowest priority) to 2 (highest priority). Default is 2. */
  priority?: number;
  /** if the notification is received on an Android device, the vibration
   * pattern in this field will change the way the device vibrates with it.
   * You can easily create a pattern by going
   * {@link http://autoremotejoaomgcd.appspot.com/AutoRemoteNotification.html here}
   * and generating the pattern in the Vibration Pattern field */
  vibration?: string;
  /** set to true to make the notification go away when you touch it */
  dismissOnTouch?: boolean;
  /** publicly available URL for an image to show up in the notification */
  image?: string;
  /** unique ID to group your notifications with */
  group?: string;
  /** publicly available URL for a sound to play with the notification */
  sound?: string;
  /** Set notification buttons with customized behaviour. More info
   * {@link https://joaoapps.com/join/actions/#notifications here}. */
  actions?: string;
}

/** Options for sending message */
export interface BaseOptions extends NotificationFields {
  /** The device ID or group ID of the device you want to send the message to.
   * It is mandatory that you either set this or the deviceIds parameter.
   * Possible groups are
   * - group.all
   * - group.android
   * - group.windows10
   * - group.phone
   * - group.tablet
   * - group.pc */
  deviceId: string;
  /** a comma separated list of device IDs you want to send the push to.
   * It is mandatory that you either set this or the deviceId parameter */
  deviceIds: string[];
  /**  a comma separated list of device names you want to send the push to.
   * It can be partial names. For example, if you set deviceNames to Nexus,PC
   * it’ll send it to devices called Nexus 5, Nexus 6, Home PC and Work PC if
   * you have devices named that way. Must be used with the API key to work! */
  deviceNames?: string;
  /** usually used as a Tasker or EventGhost command. Can also be used with
   * URLs and Files to add a description for those elements */
  text?: string;
  /** A URL you want to open on the device. If a notification is created with
   * this push, this will make clicking the notification open this URL. */
  url?: string;
  /** some text you want to set on the receiving device’s clipboard. If the
   * device is an Android device and the Join accessibility service is enabled
   * the text will be pasted right away in the app that’s currently opened. */
  clipboard?: string;
  /** a publicly accessible URL of a file. You can also send the url of a file
   * on your personal Google Drive */
  file?: string;
  /** phone number to send an SMS to. If you want to set an SMS you need to set
   * this and the smstext values */
  smsnumber?: string;
  /** some text to send in an SMS. If you want to set an SMS you need to set
   * this and the smsnumber values */
  smstext?: string;
  /** Alternatively to the smsnumber you can specify this and Join will send
   * the SMS to the first number that matches the name */
  smscontactname?: string;
  /** Subject for the message. This will make the sent message be an MMS
   * instead of an SMS */
  mmssubject?: string;
  /** File attached to the message. Must be a local (to the phone) file or a
   * publicly accessible URL. This will make the sent message be an MMS instead
   * of an SMS */
  mmsfile?: string;
  /** Set to 1 if this is an urgent MMS. This will make the sent message be an
   * MMS instead of an SMS */
  mmsurgent?: string;
  /** phone number to call */
  callnumber?: string;
  /** a publicly accessible URL of an image file. Will set the wallpaper on the
   * receiving device */
  wallpaper?: string;
  /** a publicly accessible URL of an image file. Will set the lockscreen
   * wallpaper on the receiving device if the device has Android 7 or above */
  lockWallpaper?: string;
  /** set to true to make your device ring loudly */
  find?: string;
  /** set the corresponding volumes on your device */
  mediaVolume?: number;
  /** set the corresponding volumes on your device */
  ringVolume?: number;
  /** set the corresponding volumes on your device */
  alarmVolume?: number;
  /** Set to
   * 1. to allow all interruptions
   * 2. to allow only priority interruptions
   * 3. to not allow any interruptions
   * 4. to only allow alarm related interruptions */
  interruptionFilter?: 1 | 2 | 3 | 4;
  /** Say some text out loud. */
  say?: string;
  /** The language to use for the say text */
  language?: string;
  /** App name of the app you want to open on the remote device */
  app?: string;
  /** Package name of the app you want to open on the remote device. You can
   * check the package name for an app by going to its Google Play page and
   * checking the end of the URL. */
  appPackage?: string;
}

/** Options for sending message with deviceId */
export type MessageOptions = Omit<BaseOptions, 'deviceIds'>;
/** Options for sending message with deviceIds */
export type MessageOptionsWithIds = Omit<BaseOptions, 'deviceId'>;

export type DeviceInfo = {
  id: string;
  regId: string;
  userAccount: string;
  deviceId: string;
  deviceName: string;
  deviceType: number;
  apiLevel: number;
  model?: string;
  hasTasker?: boolean;
};
