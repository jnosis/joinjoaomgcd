import { JoinJoaomgcd } from './mod.ts';

const apiKey = Deno.env.get('API_KEY')!;
const deviceId = Deno.env.get('DEVICE_ID')!;
const url = Deno.env.get('URL')!;

const client = new JoinJoaomgcd(apiKey);

const devices = await client.listDevices();

const send = await client.sendPush({
  deviceId,
  title: 'send',
  text: 'test',
  url,
});

const sendAll = await client.sendPush({
  deviceId: 'group.all',
  title: 'all',
  text: 'test',
  url,
});

const sendIds = await client.sendPushWithIds({
  deviceIds: (devices as { deviceId: string }[]).map((device) =>
    device.deviceId
  ),
  title: 'ids',
  text: 'test',
});

console.log(devices);
console.log(send);
console.log(sendAll);
console.log(sendIds);
