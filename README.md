# infos
Sketch of an app for aggregating important news, events and other infos.

# Dev setup
Linux (Kubuntu 24.04.4 LTS) <br />
Pi conding agent (Ollama, gemma4:26b) <br />
VS Code editor <br />

# Workflow
Create a plan and make notes, drawings <br />
Prompt the AI agent <br />
After each prompt, I run ```gitk``` to check the changes the AI made <br />
Manual edits <br />

# AI prompts
See promptHistory.md

# Terminal commands (manual)

Create backend app
```bash
nest new infos-backend
```

Create frontend app
```bash
npx create-next-app@latest infos-frontend
```

If the agent leaves the server running
```bash
ps aux | grep nest
lsof -i :3000
```
to stop it manually

