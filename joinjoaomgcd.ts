import type {
  BaseOptions,
  DeviceInfo,
  JoinStatus,
  MessageOptions,
  MessageOptionsWithIds,
} from './types.ts';
import {} from './types.ts';

const BASE_URL = 'https://joinjoaomgcd.appspot.com/_ah/api';

export class JoinJoaomgcd {
  #apiKey: string;
  constructor(apiKey: string) {
    this.#apiKey = apiKey;
  }

  async getDevices(): Promise<DeviceInfo[]> {
    const response = await fetch(
      `${BASE_URL}/registration/v1/listDevices?apikey=${this.#apiKey}`,
    );

    const devices = await response.json();

    if (devices.success) {
      return devices.records;
    }

    throw new Error(devices.errorMessage || 'Unknown Error');
  }

  async sendMessage(options: MessageOptions): Promise<JoinStatus> {
    return await this.#sendMessage(options);
  }

  async sendMessageWithIds(
    options: MessageOptionsWithIds,
  ): Promise<JoinStatus> {
    return await this.#sendMessage(options);
  }

  async #sendMessage<Options extends Partial<BaseOptions>>(options: Options) {
    const queries = Object.keys(options)
      .map((key) => `${key}=${options[key as keyof Options]}`)
      .join('&');
    const response = await fetch(
      `${BASE_URL}/messaging/v1/sendPush?apikey=${this.#apiKey}&${queries}`,
    );

    const status = await response.json();

    if (status.success) {
      return status;
    }

    throw status;
  }
}
