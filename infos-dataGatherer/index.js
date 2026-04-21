import infoProviders from './infoProviders';
import dbSaveResponse from './db/save';

async function main() {
  let isShuttingDown = false;

  const shutdown = async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log('Shutdown signal received. Gracefully shutting down...');
    // TODO add cleanup logic here
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  async function processingStart() {
    while (!isShuttingDown) {
      // TODO in case we need only one provider, pick one similarly to how the delivery service picks messages
      // TODO see image plan for explanation
      for (const provider of infoProviders) {
        const response = await infoProviders[provider]();
        dbSaveResponse(response); // not awaiting
      }
    }

    console.log('Processing stopped due to shutdown.');
  }

  try {
    await processingStart();
  } catch (error) {
    console.error('An error occurred during processing:', error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error in main:', err);
  process.exit(1);
});
