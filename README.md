# infos
Sketch of an app for aggregating important news, events and other infos.

# Dev setup
Linux (Kubuntu 24.04.4 LTS)
Pi conding agent (Ollama, gemma4:26b)
VS Code editor

# Workflow
Create a plan and make notes, drawings
Prompt the AI agent
After each prompt, I run ```gitk``` to check the changes the AI made
Manual edits

# AI prompts
```
The work directory is ~/Work/Sandbox/infos/. Only change files within this directory, double check paths before taking action.
Check top level folder structure first, then each folder but ignore folders called node_modules.
```
```
In the infos-delivery folder, create an index.js file as the main file of a Node.js app.
Add handling of OS signals for graceful shutdown.
Add a main function that executes an async function and returns when the async function returns or the app is asked to shut down (signal received).
Add the async function called "processingStart" that for now does nothing.
```
```
Look at my changes and edit the processingStart function to exit when shutdown is in progress
```

# Terminal commands (manual)

Create backend app
```bash
nest new infos-backend
```

Create frontend app
```bash
npx create-next-app@latest infos-frontend
```