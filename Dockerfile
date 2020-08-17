# build environment
FROM node:12.18.3-alpine as build
COPY package.json .
RUN yarn
COPY . ./
RUN yarn build
ENV PATH ./node_modules/.bin:$PATH
EXPOSE 3000
CMD ["yarn", "start"]
