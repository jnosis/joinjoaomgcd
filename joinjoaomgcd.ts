import type {
  BaseOptions,
  DeviceInfo,
  JoinStatus,
  PushOptions,
  PushOptionsWithIds,
} from './types.ts';

const BASE_URL = 'https://joinjoaomgcd.appspot.com/_ah/api';

/**
 * A class for providing convenient access to the JoinJoaomgcd API
 */
export class JoinJoaomgcd {
  /** The api key to connect your account */
  #apiKey: string;
  /**
   * Create a new joinJoaomgcd client with the given api key
   *
   * @param apiKey The api key to connect your account
   */
  constructor(apiKey: string) {
    this.#apiKey = apiKey;
  }

  /**
   * Get your devices info list
   *
   * @returns The array of your devices infos
   */
  async listDevices(): Promise<DeviceInfo[]> {
    const response = await fetch(
      `${BASE_URL}/registration/v1/listDevices?apikey=${this.#apiKey}`,
    );

    const devices = await response.json();

    if (devices.success) {
      return devices.records;
    }

    throw new Error(devices.errorMessage || 'Unknown Error');
  }

  /**
   * Send push to a specific device or group
   *
   * @param options The options for send push with device id
   * @returns The status of JoinJoaomgcd's response status
   */
  async sendPush(options: PushOptions): Promise<JoinStatus> {
    return await this.#sendPush(options);
  }

  /**
   * Send push to specific devices
   *
   * @param options The options for send push with device ids
   * @returns The status of JoinJoaomgcd's response status
   */
  async sendPushWithIds(options: PushOptionsWithIds): Promise<JoinStatus> {
    return await this.#sendPush(options);
  }

  async #sendPush<Options extends Partial<BaseOptions>>(options: Options) {
    const queries = Object.keys(options)
      .map((key) => `${key}=${encodeURI(`${options[key as keyof Options]}`)}`)
      .join('&');
    const response = await fetch(
      `${BASE_URL}/messaging/v1/sendPush?apikey=${this.#apiKey}&${queries}`,
    );

    const status = await response.json();

    if (status.success) {
      return status;
    }

    throw new Error(status.errorMessage || 'Unknown Error');
  }
}
