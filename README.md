## Overview

This project is a full-stack NextJS rendition of the [Uniqlo US Website](https://www.uniqlo.com/us/en/), this development is a part of Part 1 of a UX case study I am conducting. 

This current project is made to simulate the current Uniqlo US website as close as possible in NextJS.

Part 2 will consist of a UX critique and redesign, then will be implemented on top of this repo.

## Tech Stack
### NextJS
Next is used for both the UI and Server.

### MySQL
I decided to go with MySQL becuase its what i'm most familiar with. In order to access the database, you'll have to spin up the docker container (docker-compose.yml). 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For starting the MySQL databse, refer to the docker-compose.yml file.
