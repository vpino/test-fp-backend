FROM node:21-alpine as builder

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build


FROM node:21-alpine
RUN yarn global add pm2
USER node
WORKDIR /usr/src/app
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
COPY package.json yarn.lock ./
COPY public ./public
RUN mkdir -p env
COPY "env/.${NODE_ENV}.env" env/
RUN yarn install --production --frozen-lockfile
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000

CMD ["pm2-docker", "dist/main.js", "-i max"]