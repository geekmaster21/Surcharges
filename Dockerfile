# build environment
FROM node:15-alpine as build
COPY package.json .
RUN yarn add yarn --global
RUN yarn
COPY . ./
RUN yarn build
ENV PATH ./node_modules/.bin:$PATH
# Keep PORT same as in package.json > scripts > start PORT
EXPOSE 5001 
CMD ["yarn", "start"]
