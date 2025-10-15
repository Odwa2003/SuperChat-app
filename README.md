# SuperChat-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Firebase Cloud Messaging (Push Notifications)

This project includes a basic Firebase Cloud Messaging (FCM) setup for web push notifications.

Files added/changed:
- `src/firebase.js` — centralized Firebase initialization and FCM helpers.
- `public/firebase-messaging-sw.js` — service worker to handle background notifications.
- `src/App.js` — requests notification permission and retrieves FCM token.

Quick setup checklist:
1. Open the Firebase Console for your project -> Settings -> Cloud Messaging.
2. Under 'Web Push certificates' copy the 'Key pair' (public key) and paste it into `src/App.js` as the `vapidKey` variable.
3. To send messages from a server, use the service account JSON available at `public/service_key.json` (this repo contains a service account for convenience). Use the server SDK or the HTTP v1 API to send messages to device tokens.

Local testing:
- Start the app: `npm start`.
- Allow notifications when the browser prompts.
- The app will log the FCM registration token in the browser console — copy that token for testing.
- To send a test message, you can use the Firebase Admin SDK on a server or cURL against the FCM HTTP v1 API. For quick testing, use the Firebase Console -> Cloud Messaging -> 'Send your first message' and target the token.

Notes and security:
- Do not commit production service account keys into public repositories. The included `public/service_key.json` is present for local testing only. For production, store secrets securely (environment variables, secret manager).
- Update the VAPID key and confirm the service worker file is deployed at `/firebase-messaging-sw.js` (Create React App serves files from `public/`).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
