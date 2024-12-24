FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
EXPOSE 4000
CMD ["yarn", "start"]
