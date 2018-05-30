import nes from "nes/client";
const client = new nes.Client("ws://localhost:8000"); //change on deployment server
 
const NesClient = (async function() {
  try {
    await client.connect();
    return client;
  } catch (err) {
    console.log(err);
  }
})();

export default NesClient;
