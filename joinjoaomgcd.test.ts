import type { Stub } from '@std/testing/mock';
import { assertEquals, assertExists, assertRejects } from '@std/assert';
import { afterAll, beforeAll, describe, it } from '@std/testing/bdd';
import { stub } from '@std/testing/mock';
import { JoinJoaomgcd } from './mod.ts';

describe('JoinJoaomgcd', () => {
  const apiKey = Deno.env.get('API_KEY') || '';
  const deviceId = Deno.env.get('DEVICE_ID') || '';
  const deviceIds = [deviceId, Deno.env.get('DEVICE_ID2') || ''];

  describe('listDevices', () => {
    it('throws authenticated error when Invalid api key', () => {
      const client = new JoinJoaomgcd(apiKey + 'a');

      assertRejects(
        async () => await client.listDevices(),
        Error,
        'User Not Authenticated',
      );
    });

    it('gets devices info list', async () => {
      const client = new JoinJoaomgcd(apiKey);
      const list = await client.listDevices();

      assertExists(list);
    });
  });

  describe('sendPush', () => {
    it('throws authenticated error when api key is invalid', () => {
      const client = new JoinJoaomgcd(apiKey + 'a');

      assertRejects(
        async () =>
          await client.sendPush({ deviceId, title: 'title', text: 'text' }),
        Error,
        'User Not Authenticated',
      );
    });

    it('throws error when device id is invalid', () => {
      const client = new JoinJoaomgcd(apiKey);

      assertRejects(
        async () =>
          await client.sendPush({
            deviceId: deviceId + 'a',
            title: 'title',
            text: 'text',
          }),
        Error,
        'No device to send message to',
      );
    });

    it('sends message to device', async () => {
      const client = new JoinJoaomgcd(apiKey);
      const status = await client.sendPush({
        deviceId,
        title: 'title',
        text: 'text',
      });

      assertEquals(status, { success: true, userAuthError: false });
    });
  });

  describe('sendPushWithIds', () => {
    it('throws authenticated error when api key invalid', () => {
      const client = new JoinJoaomgcd(apiKey + 'a');

      assertRejects(
        async () =>
          await client.sendPushWithIds({
            deviceIds,
            title: 'title',
            text: 'text',
          }),
        Error,
        'User Not Authenticated',
      );
    });

    it('throws error when device ids are invalid', () => {
      const client = new JoinJoaomgcd(apiKey);

      assertRejects(
        async () =>
          await client.sendPushWithIds({
            deviceIds: deviceIds.map((id) => id + 'a'),
            title: 'title',
            text: 'text',
          }),
        Error,
        'No devices to send to',
      );
    });

    it('sends message to devices', async () => {
      const client = new JoinJoaomgcd(apiKey);
      const status = await client.sendPushWithIds({
        deviceIds,
        title: 'title',
        text: 'text',
      });

      assertEquals(status, { success: true, userAuthError: false });
    });
  });

  describe('Unknown Errors', () => {
    let stubbed: Stub;

    beforeAll(() => {
      stubbed = stub(
        window,
        'fetch',
        () => Promise.resolve(new Response('{}')),
      );
    });

    afterAll(() => {
      stubbed.restore();
    });

    it('throws unknown error on `listDevices`', () => {
      const client = new JoinJoaomgcd(apiKey);

      assertRejects(
        async () => await client.listDevices(),
        Error,
        'Unknown Error',
      );
    });

    it('throws unknown error on `sendPush`', () => {
      const client = new JoinJoaomgcd(apiKey);

      assertRejects(
        async () =>
          await client.sendPush({ deviceId, title: 'title', text: 'text' }),
        Error,
        'Unknown Error',
      );
    });
  });
});
