## Description
Spotify clone built with React.js using the Spotify API.

Currently works on desktop only.  
I'm however thinking of building a moblie version using React Native.  
View live at [litphum.aboutryansam.com](https://litphum.aboutryansam.com)

## Run Locally

### Step 1
First you will need to create an app using Spotify's website to obtain a cleint id and a client secret.  
Follow the links on their [developer site](https://developer.spotify.com/) to do so.

### Step 2
You will need to write an OAuth backend service to connect to their API. Spotify has instruction [here](https://developer.spotify.com/).

Or you can clone mine!  
`git clone https://github.com/ryansaam/litphum-server.git`  
This is an edited version of DevTips OAuth app. [See video](https://github.com/mpj/oauth-bridge-template)

### Step 3  
Create a .env file with these values
```
REACT_APP_URL=http://localhost:3000
REACT_APP_AUTH_LOGIN_URL=http://localhost:8888
```
These can be fit to your implementation e.g.:  
```
REACT_APP_URL=https://exampledomain.com
REACT_APP_AUTH_LOGIN_URL=http://exampledomain:8080
```

#### `npm run dev`
This will create a `window._env_` object in `env-config.js` and launch the app at [http://localhost:3000](http://localhost:3000)

### Step 4 (Optional if using my OAuth backend)
Create a .env file with these values
```
SPOTIFY_CLIENT_ID=47wtf2your6id57rv
SPOTIFY_CLIENT_SECRET=23dkx3your9secret90ch
```
Then:  
`node server.js`

If you would like to add more privlages edit the `const scope` in `app.get('/login', function(req, res) { ... })`  
see scopes [here](https://developer.spotify.com/documentation/general/guides/scopes/)


## Using Docker and Docker Compose
Note: This is how I implement it with my frontend and backend services. You may do so however you like.

You will need:  
- A container for the backend  
- A container for the fronend  
- A proxy server  

Directory structure:  
<ul style="list-style: none;">
  <li>
    - app
    <ul style="list-style: none;">
      <li>
        - litphum
        <ul style="list-style: none;">
          <li>Dockerfile</li>
          <li>...</li>
        </ul>
      </li>
      <li>
        - litphum-server
        <ul style="list-style: none;">
          <li>Dockerfile</li>
          <li>...</li>
        </ul>
      </li>
      <li>
        - nginx-proxy
        <ul style="list-style: none;">
          <li>.conf</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

### Dockerfile for frontend
```Dockerfile
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY ./ /app/
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.16-alpine
COPY build /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
# from https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/
# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
```

### Dockerfile for backend
```Dockerfile
FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 8888

CMD [ "node", "server.js" ]
```

### Nginx proxy config
```conf
server {
  listen 3000;
  listen [::]:3000;

  server_name localhost;

   location / {
     proxy_pass http://litphum;
   }
}

server {
  listen 8888;
  listen [::]:8888;

  server_name localhost;

   location / {
     proxy_pass http://spotify-auth;
   }
}
```

### docker-compose.yml
```yml
version: '3'
services:
  litphum-server:
    container_name: spotify-auth
    env_file: ./litphum-server/.env
    build:
      context: ./litphum-server
    networks:
      web-network:
        aliases:
          - spotify-auth
  litphum:
    container_name: litphum
    env_file: ./litphum/.env
    build:
      context: ./litphum
    networks:
      web-network:
        aliases:
          - litphum
  proxy_server:
    image: nginx:1.16-alpine
    container_name: proxy_server
    ports:
      - "80:80"
    volumes:
      - ./nginx-proxy:/etc/nginx/conf.d
    networks:
      - web-network
    depends_on:
      - litphum
      - litphum-server
volumes:
  web-root:
    driver: local
    driver_opts:
      type: none
      device: /home/user/web_server/views
      o: bind
networks:
  web-network:
```
