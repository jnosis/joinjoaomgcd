# joinjoaomgcd

[![JSR](https://jsr.io/badges/@unface/joinjoaomgcd)](https://jsr.io/@unface/joinjoaomgcd)
[![JSR Score](https://jsr.io/badges/@unface/joinjoaomgcd/score)](https://jsr.io/@unface/joinjoaomgcd/score)
[![codecov](https://codecov.io/github/jnosis/joinjoaomgcd/graph/badge.svg?token=OA6OQQGIRM)](https://codecov.io/github/jnosis/joinjoaomgcd)

This library provides convenient access to the
[JoinJoaomgcd](https://joaoapps.com/join/) REST API from TypeScript or
JavaScript.

## Usage

```ts
const client = new JoinJoaomgcd(YOUR_API_KEY);

const devices = await client.listDevices();

const send = await client.sendPush({
  deviceId: SPECIFIC_DEVICE_ID,
  title: 'send',
  text: 'test',
});

const sendAll = await client.sendPush({
  deviceId: 'group.all',
  title: 'all',
  text: 'test',
});

const sendIds = await client.sendPushWithIds({
  deviceIds: devices.map((device) => device.deviceId),
  title: 'ids',
  text: 'test',
});
```

## License

[MIT](./LICENSE.md)
