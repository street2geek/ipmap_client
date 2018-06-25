import nes from "nes/client";
const client = new nes.Client("ws://45.77.90.193:80");
 
const NesClient = (async function() {
  try {
    await client.connect();
    return client;
  } catch (err) {
    console.log(err);
  }
})();

export default NesClient;
