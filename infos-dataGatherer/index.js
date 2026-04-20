async function main() {
  let isShuttingDown = false;

  const shutdown = async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log('Shutdown signal received. Gracefully shutting down...');
    // Add cleanup logic here if needed
    console.log('Shutdown complete.');
    process.exit(0);
  };

  // Handle OS signals for graceful shutdown
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  async function processingStart() {
    console.log('Processing started...');
    // Loop until shutdown is requested
    while (!isShuttingDown) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log('Processing stopped due to shutdown.');
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
