# init dir
if [ ! -d production ]; then
  mkdir production
else
  rm -r production
  mkdir production
fi

# pack server
echo "\033[44;37mProcess\033[0m \033[32mPacking server.\033[0m"
cp -r pica-server production
cd production/pica-server
tsc
cd ../../

# pack client
# cd pica-client
# npm run build
# cd ../
echo "\033[44;37mProcess\033[0m \033[32mPacking client.\033[0m"
cp -r pica-client/dist production/pica-client

# pack docs
cp -r script/web/docs/ production
echo "\n\033[42;37mSucceed\033[0m \033[36mAll packed.\033[0m"

# info
du -sh production
