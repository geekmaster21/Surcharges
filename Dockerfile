# build environment
FROM node:12-alpine as build
COPY dsite/ /app/dsite/
WORKDIR /app/dsite
RUN yarn
RUN yarn run build
ENV PATH /app/dsite/node_modules/.bin:$PATH
EXPOSE 3000
CMD ["yarn", "start"]
