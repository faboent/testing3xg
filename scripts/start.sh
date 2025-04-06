#!/bin/sh

if [ -d "/app/dist" ]; then
  echo "Injecting environment variables..."

  echo "window.env = {" > /app/dist/env-config.js

  # Add all environment variables that start with REACT_APP_ or VITE_
  env | grep -E "^(REACT_APP_|VITE_)" | while read -r line; do
    # Extract key and value
    key=$(echo "$line" | awk -F= '{print $1}')
    value=$(echo "$line" | awk -F= '{print $2}')

    echo "  $key: \"$value\"," >> /app/dist/env-config.js
  done

  echo "};" >> /app/dist/env-config.js

  echo "Environment variables injected successfully."
fi

# Execute the CMD
exec "$@"
