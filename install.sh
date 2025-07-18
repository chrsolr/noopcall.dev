#!/bin/bash

ask_user() {
    read -p "$1 [y/N]: " answer
    case "$answer" in
        [Yy]* ) return 0 ;;
        * ) return 1 ;;
    esac
}

echo "Noopcall Macintosh Apps & Packages Install Script..."

sleep 2

start_time=$(date +%s)

if ask_user "Install Homebrew?"; then
  echo "Running homebrew install command..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  echo "Finished Homebrew installation!"
else
  echo "Skipping Homebrew..."
fi

end_time=$(date +%s)
elapsed=$(( end_time - start_time ))
minutes=$(( elapsed / 60 ))
seconds=$(( elapsed % 60 ))

echo "Script completed in ${minutes}m ${seconds}s."

