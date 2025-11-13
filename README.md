# tiny-ts-node

A minimal TypeScript + Node.js project setup with live reloading, linting, and build scripts — no React.

## Commands

```
npm start	 // Build and run compiled JavaScript
npm run dev	 // Run with live reload via ts-node-dev
npm run build	 // Compile TypeScript to dist/
npm run lint	 // Run ESLint checks
npm run lint:fix // Auto-fix ESLint issues
```

## Notes
- Uses CommonJS (no need for "type": "module").
- ts-node-dev watches files and reloads automatically.
- ESLint uses the new Flat Config format (ESLint 9+).
- The globals package enables Node globals like process, console, etc.

## Example

Run:

```
npm run dev
```

Then edit src/index.ts:
```
console.log('Hello from TypeScript!');
```

It will automatically reload and print:

```
Hello from TypeScript!
```


## Shortcuts

- control + Command + spaceBar = Add emoji in vscode
