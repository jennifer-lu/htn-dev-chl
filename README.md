# htn-dev-chl

🌎 Hackathon Global web app for Hack the North's 2022 Frontend Developer Challenge.

<img width="1781" alt="web-app" src="https://user-images.githubusercontent.com/49915445/153736982-d65c6f84-9be6-4e65-95df-a5f4e5370519.png">

## Getting started

### Prerequisites

Verify yarn is installed:

```
yarn --version
```

[Instructions for installing yarn](https://classic.yarnpkg.com/lang/en/docs/install)

### Run the application

Clone and run:

```bash
# Clone repository
git clone https://github.com/jennifer-lu/htn-dev-chl.git

# Go to directory
cd htn-dev-chl

# Set environment variables
mv .sample-env .env

# Install dependencies
yarn install

# Run locally
yarn start
```

Open [localhost:3000](http://localhost:3000/) in your browser to view the web app.

Note: You can use your own environment variables. Make a `.env` file and set the variables `REACT_APP_USERNAME` and `REACT_APP_PASSWORD` to your desired username and password, respectively.

## Architecture

### Stack

Frontend JavaScript libraries: React, TypeScript

Component library: Chakra UI

Search library: Fuse.js

API client libraries: Apollo Client, GraphQL

Linters: ESLint, Prettier

### Directory structure

```bash
.
├── node_modules
...
├── package.json
├── prettier.config.js
├── public
│   ├── images                       # Image assets
│   │   ├── earth-background.png
│   │   ├── earth-icon.png
│   │   └── earth-modal.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── api                          # API
│   │   ├── ApiClient.ts
│   │   └── queries
│   │       └── EventQueries.ts
│   ├── components                   # Components
│   │   ├── homepage
│   │   │   ├── EventCard.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── RelatedEventList.tsx
│   │   │   ├── SpacerCard.tsx
│   │   │   ├── SpeakerList.tsx
│   │   │   └── WelcomeModal.tsx
│   │   ├── navigation
│   │   │   ├── LoginComponent.tsx
│   │   │   ├── NavigationBar.tsx
│   │   │   ├── NavigationMenu.tsx
│   │   │   └── SearchBar.tsx
│   │   └── pages
│   │       └── HomePage.tsx
│   ├── contexts                     # Contexts
│   │   ├── AuthContext.ts
│   │   └── DeviceContext.ts
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   └── theme                        # Styling
│       ├── colors.ts
│       ├── components
│       │   ├── Button.ts
│       │   └── Heading.ts
│       └── theme.ts
├── tsconfig.json
└── yarn.lock
```

### Design

[Figma wireframes](https://www.figma.com/file/K4mOPjIYXukgQQ5AgtRi83/htn-dev-chl?node-id=0%3A1)
