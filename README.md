## Description
Spotify clone built using the Spotify API.

Currently works on desktop only.  
I'm however thinking of building a moblie version using React Native.

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

