import { StringCodec, connect } from "nats";

const server = {
  servers: "0.0.0.0:4222",
};

const main = async () => {
  try {
    const nc = await connect(server);
    console.log(`connected to ${nc.getServer()}`);

    const sc = StringCodec();
    for(let i=0; i<10; i++) {
        nc.publish("notify", sc.encode("Hello world"));
    }   

  } catch (err) {
    console.log(`error connecting to ${JSON.stringify(server)}`);
  }
};

main();
