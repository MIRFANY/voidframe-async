// Quick script to require server modules to detect syntax errors
try {
  require('./src/index');
  console.log('index.js loaded (note: may attempt to connect to DB)');
} catch (err) {
  console.error('Import failed:', err.message);
  process.exit(1);
}