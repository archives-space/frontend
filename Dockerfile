FROM node
EXPOSE 80
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN if [ ! -f /usr/local/bin/yarn ]; then echo "Installing yarn..." && npm i -g yarn; else echo "Yarn found"; fi
RUN yarn
ENV API_BASE_URL https://api.wikiarchives.space
RUN yarn build
ENV HOST 0.0.0.0
ENV PORT 80
CMD [ "yarn", "start" ]
