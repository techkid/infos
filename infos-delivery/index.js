import db from './db';
import deliveryChannels from './deliveryChannels';

async function main() {
  let isShuttingDown = false;

  const shutdown = async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log('Shutdown signal received. Gracefully shutting down...');
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  // generate unique ID for this instance of the service
  const uniqServiceId = (() => "generation logic here")();

  async function processingStart() {
    while (!isShuttingDown) {
      // TODO pseudocode

      // lock and pick messages to deliver
      db.query("update userMessages where isDelivered = false set processingBy = ? limit 20", uniqServiceId); // adjust limit to do more at once
      const messagesToDeliver = db.query("select * from userMessages where processingBy = ?", uniqServiceId);

      const deliveryPromises = [];

      for (const message of messagesToDeliver) {
        // TODO preload this to avoid query spam
        const userDeliveryChannels = db.query("select * from userDeliveryMethods where userId = ?", message.userId);

        for (const channel of userDeliveryChannels) {
          deliveryPromises.push(deliveryChannels[channel.internalName](message));
        }
      }

      // lets wait to avoid spinning up too many work
      await Promise.all(deliveryPromises);
      //----------------
    }
  }

  try {
    await processingStart();
    console.log('Processing finished successfully.');
  } catch (error) {
    console.error('An error occurred during processing:', error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error in main:', err);
  process.exit(1);
});
