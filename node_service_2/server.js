import { StringCodec, connect } from "nats";

const server = {
  servers: "0.0.0.0:4222",
};

const main = async () => {
  try {
    const nc = await connect(server);
    console.log(`connected to ${nc.getServer()}`);

    const sc = StringCodec();
    const sub = nc.subscribe("notify")
    for await (const m of sub) {
      console.log(`${sub.getProcessed()}: ${sc.decode(m.data)}`);
    }

    // this promise indicates the client closed
    const done = nc.closed();
    await nc.close();
    const err = await done;
    if (err) {
      console.log(`error closing:`, err);
    }
  } catch (err) {
    console.log(`error connecting to ${JSON.stringify(server)}`);
  }
};

main();
