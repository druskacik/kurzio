# Dockerfile
FROM node:16.13.2-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade

# Installs latest Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

RUN apk add git

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

RUN apt-get install xvfb

RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install --force

EXPOSE 3000

CMD ["xvfb-run", "-a", "--server-args=\"-screen 0 1280x800x24 -ac -nolisten tcp -dpi 96 +extension RANDR\"", "npm", "start"]