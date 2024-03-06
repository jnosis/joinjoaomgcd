import type {
  BaseOptions,
  MessageOptions,
  MessageOptionsWithIds,
} from './types.ts';

const BASE_URL = 'https://joinjoaomgcd.appspot.com/_ah/api';

export class JoinJoaomgcd {
  #apiKey: string;
  constructor(apiKey: string) {
    this.#apiKey = apiKey;
  }

  async getDeviceList() {
    return await fetch(
      `${BASE_URL}/registration/v1/listDevices?apikey=${this.#apiKey}`,
    );
  }

  async sendMessage(options: MessageOptions) {
    return await this.#sendMessage(options);
  }

  async sendMessageWithIds(options: MessageOptionsWithIds) {
    return await this.#sendMessage(options);
  }

  async #sendMessage<Options extends Partial<BaseOptions>>(options: Options) {
    const queries = Object.keys(options)
      .map((key) => `${key}=${options[key as keyof Options]}`)
      .join('&');
    return await fetch(
      `${BASE_URL}/messaging/v1/sendPush?apikey=${this.#apiKey}&${queries}`,
    );
  }
}
