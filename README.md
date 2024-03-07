# joinjoaomgcd

This library provides convenient access to the
[JoinJoaomgcd](https://joaoapps.com/join/) REST API from TypeScript or
JavaScript.

## Usage

```ts
const client = new JoinJoaomgcd(YOUR_API_KEY);

const list = await client.getDeviceList();

const send = await client.sendMessage({
  deviceId: SPECIFIC_DEVICE_ID,
  title: 'send',
  text: 'test',
});

const sendAll = await client.sendMessage({
  deviceId: 'group.all',
  title: 'all',
  text: 'test',
});

const devices = (await list.json()).records;

const sendIds = await client.sendMessageWithIds({
  deviceIds: devices.map((device) => device.deviceId),
  title: 'ids',
  text: 'test',
});
```

## License
