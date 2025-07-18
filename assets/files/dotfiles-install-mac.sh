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

name="Homebrew"
if ask_user "Install $name?"; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="Git"
if ask_user "Install $name?"; then
  brew install git
  git config --global user.email "chr.solr@gmail.com"
  git config --global user.name "chrsolr"
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="TMUX & TMP"
if ask_user "Install $name?"; then
  brew install tmux
  git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="Ghostty"
if ask_user "Install $name?"; then
  brew install --cask ghostty
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="NeoVim"
if ask_user "Install $name?"; then
  brew install neovim
  brew install fd
  brew install ripgrep
  git clone git@github.com:chrsolr/neovim-config.git ~/.config/nvim
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="NVM"
if ask_user "Install $name?"; then
  brew install nvm
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="PNPM"
if ask_user "Install $name?"; then
  brew install pnpm
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="ZSH"
if ask_user "Install $name?"; then
  brew install zsh
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="Oh My ZSH"
if ask_user "Install $name?"; then
  RUNZSH=no sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="ZSH Auto-Suggestions"
if ask_user "Install $name?"; then
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="Dotnet"
if ask_user "Install $name?"; then
  brew install dotnet
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

name="Symbolic Links"
if ask_user "Create $name?"; then
  echo "Making Directories..."
  mkdir -p ~/.config/ghostty

  echo "Creating links..."
  ln -sf ~/dev/dotfiles/vim/.vimrc ~/.vimrc
  ln -sf ~/dev/dotfiles/zshrc/.zshrc ~/.zshrc
  ln -sf ~/dev/dotfiles/tmux/.tmux.conf ~/.tmux.conf
  ln -sf ~/dev/dotfiles/ghostty/mac.config ~/.config/ghostty/config

  echo "Finished with $name!"
else
  echo "Skipping $name..."
fi

name="Node LTS"
if ask_user "Install $name?"; then
  zsh -i -c 'source ~/.zshrc && nvm install --lts'
  echo "Finished $name installation!"
else
  echo "Skipping $name..."
fi

end_time=$(date +%s)
elapsed=$(( end_time - start_time ))
minutes=$(( elapsed / 60 ))
seconds=$(( elapsed % 60 ))

echo "Script completed in ${minutes}m ${seconds}s."

