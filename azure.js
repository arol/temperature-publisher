const iotDevice = require("./iot-device");

const { EventHubProducerClient } = require("@azure/event-hubs");
const Identity = require("@azure/identity");

const DEVICE_ID_PREFIX = "device-arol";
const NUM_OF_DEVICES = 10;
const initialTemperature = 25;
const initialHumidity = 50;

const eventHubName = /* AQUI EL NOMBRE DEL EVENTHUB NAMESPACE */;

const producer = new EventHubProducerClient(
   /* AQUI CONNECTION STRING DEL EVENT HUB */,
  eventHubName
);

console.log("Start monitoring and sending data to event hub");

for (let index = 1; index <= NUM_OF_DEVICES; index++) {
  const deviceNumber = String(index).padStart(3, "0");
  const deviceId = `${DEVICE_ID_PREFIX}-${deviceNumber}`;

  iotDevice(
    deviceId,
    initialTemperature,
    initialHumidity,
    5,
    async (snapshot) => {
      try {
        const batch = await producer.createBatch({});
        batch.tryAdd({
          body: snapshot,
          contentType: "application/json",
        });

        // Send the batch to the event hub.
        await producer.sendBatch(batch);

        console.log("Snapshot sent", snapshot);
      } catch (error) {
        console.log("Error when sending message: ", error);
      }
    }
  );
}
