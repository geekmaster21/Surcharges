# build environment
FROM node:12-alpine as build
COPY src/ /app/src/
WORKDIR /app/src
RUN yarn
RUN yarn run build
ENV PATH /app/src/node_modules/.bin:$PATH
EXPOSE 3000
CMD ["yarn", "start"]
