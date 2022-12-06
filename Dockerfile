# Fixed at current lts version
FROM node:18-slim 
WORKDIR /home/node/app
USER node
CMD npm install && npm run dev
