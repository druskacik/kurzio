FROM node:16

RUN apt-get update && \
    apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
    xvfb x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps libgbm-dev

WORKDIR /app
COPY package.json /app

RUN npm install

COPY . /app
EXPOSE 3000

CMD xvfb-run --server-args="-screen 0 1024x768x24" npm start

# Dockerfile
# FROM node:16.13.2-

# # create destination directory
# RUN mkdir -p /usr/src/nuxt-app
# WORKDIR /usr/src/nuxt-app

# # update and install dependency
# RUN apk update && apk upgrade

# # Installs latest Chromium (100) package.
# RUN apk add --no-cache \
#       chromium \
#       nss \
#       freetype \
#       harfbuzz \
#       ca-certificates \
#       ttf-freefont \
#       nodejs \
#       yarn \
#       xvfb \
#       xvfb-run

# RUN apk add git

# # Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# # Puppeteer v13.5.0 works with Chromium 100.
# # RUN yarn add puppeteer@22.4.1

# # Add user so we don't need --no-sandbox.
# RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
#     && mkdir -p /home/pptruser/Downloads /app \
#     && chown -R pptruser:pptruser /home/pptruser \
#     && chown -R pptruser:pptruser /app

# # copy the app, note .dockerignore
# COPY . /usr/src/nuxt-app/
# RUN npm install --force

# EXPOSE 3000

# CMD ["xvfb-run", "-a", "--server-args=\"-screen 0 1280x800x24 -ac -nolisten tcp -dpi 96 +extension RANDR\"", "npm", "start"]