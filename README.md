# infos
Sketch of an app for aggregating important news, events and other infos. <br />

Run frontend: <br />
```bash
npx next dev
```

Run backend: <br />
```bash
npx nest start
```

Microservices currently are not functional and contain some pseudo code. <br />
See *-plan.png files for each service for more details. <br />

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

# Infrastructure (not implemented)
<b>Dev setup: </b> <br />
Docker for all 4 apps + PostgreSQL <br />
Run with ```docker compose``` to start the whole setup

<b> Production setup (AWS): </b> <br />
Frontend: CloudFront <br />
Backend and microservices: Kubernetes (EKS), EC2 backed <br />
Database: RDS (PostgreSQL) <br />
VPC: only backend is public facing, microservices not accessible from outside <br />
CloudWatch logs for the start <br />
