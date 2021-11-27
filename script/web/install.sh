# install server
echo "\033[44;37mProcess\033[0m \033[32mInstalling server...\033[0m"
cd pica-server
npm install
cd ../

# install client
echo "\033[44;37mProcess\033[0m \033[32mInstalling client...\033[0m"
cd pica-client
npm install
cd ../
