# init dir
if [ ! -d production ];then
  mkdir production
else
  rm -r production
  mkdir production
fi

# pack server
cp -r pica-server production

# pack api module
cp -r picaApi production

# pack client
cp -r pica-client/dist production/pica-client

# pack docs
cp -r script/web/docs/ production
