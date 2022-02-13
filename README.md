# htn-dev-chl

🌎 Hackathon Global web app for Hack the North's 2022 Frontend Developer Challenge.

## Getting Started

### Prerequisites

Verify yarn is installed:

```
yarn --version
```

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

Frontend JavaScript libraries:
React
TypeScript

Component library:
Chakra UI

Search library:
Fuse.js

API query:
Apollo Client
GraphQL

Linter:
ESLint
Prettier

### Directory Structure

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
