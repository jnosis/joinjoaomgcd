import { JoinJoaomgcd } from './mod.ts';

const apiKey = Deno.env.get('API_KEY')!;
const deviceId = Deno.env.get('DEVICE_ID')!;
const url = Deno.env.get('URL')!;

const client = new JoinJoaomgcd(apiKey);

const devices = await client.getDevices();

const send = await client.sendMessage({
  deviceId,
  title: 'send',
  text: 'test',
  url,
});

const sendAll = await client.sendMessage({
  deviceId: 'group.all',
  title: 'all',
  text: 'test',
  url,
});

const sendIds = await client.sendMessageWithIds({
  deviceIds: (devices as { deviceId: string }[]).map((device) =>
    device.deviceId
  ),
  title: 'ids',
  text: 'test',
});

console.log(devices);
console.log(await send.json());
console.log(await sendAll.json());
console.log(await sendIds.json());
