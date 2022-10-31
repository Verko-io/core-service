const defaults = {
  LOG_ERROR_FILE: 'error.log.json',
  LOG_COMBINED_FILE: 'combined.log.json',
  LOG_LEVEL: 'info',
  SERVICE_NAME: process.env.npm_package_name,
};

export default defaults;
