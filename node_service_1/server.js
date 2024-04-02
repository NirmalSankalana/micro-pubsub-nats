const _ = require("lodash");
import { StringCodec, connect } from "nats";

const server = {
  servers: "0.0.0.0:4222",
};

const main = async () => {
  try {
    const nc = await connect(server);
    console.log(`connected to ${nc.getServer()}`);

    const fakeObjects = _.times(10, () => ({
      id: _.uniqueId(),
      name: _.sample(["Alice", "Bob", "Charlie"]),
      age: _.random(18, 60),
    }));

    const sc = StringCodec();

    _.forEach(fakeObjects, (o) => {
      nc.publish("notify", sc.encode(JSON.stringify(o)));
    });  

  } catch (err) {
    console.log(`error connecting to ${JSON.stringify(server)}`);
  }
};

main();
