# Quickstart Guide: Todo Evolution Constitution

## Overview
This guide provides a quick introduction to getting started with the Todo Evolution project based on the constitution. It covers the foundational architecture and how to begin implementing the 5-phase evolution.

## Prerequisites
- Python 3.13+ for Phase I (CLI)
- Node.js 18+ and npm/yarn for Phase III (Web UI)
- Docker and Docker Compose for containerization
- Kubernetes cluster (Minikube for local development, DOKS for production)
- Git for version control

## Setting Up the Development Environment

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/todo-evolution.git
cd todo-evolution
```

### 2. Install Dependencies
For Phase I (CLI):
```bash
# Using uv (recommended)
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e .
```

Or using pip:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -e .
```

For Phase III (Web UI):
```bash
cd ui
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root with the following variables:
```env
# Database configuration
DATABASE_URL=postgresql://user:password@localhost:5432/todo_db

# API configuration
API_HOST=localhost
API_PORT=8000

# AI agent configuration
OPENAI_API_KEY=your_openai_api_key_here
DAPR_HTTP_PORT=3500
DAPR_GRPC_PORT=50001

# Authentication
JWT_SECRET_KEY=your_jwt_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Running Different Phases

### Phase I: CLI Console App
```bash
# Activate the Python environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Run the CLI application
todo --help

# Example commands:
todo add "Buy groceries" "Milk and bread"
todo list
todo done 1
todo update 1 --title "Updated task"
```

### Phase II: Web API
```bash
# Activate the Python environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Start the API server
uv run uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at `http://localhost:8000`

### Phase III: Web UI
```bash
cd ui
npm run dev
```

UI will be available at `http://localhost:3000`

### Phase IV: Agentic Architecture
1. Start Dapr:
```bash
dapr run --app-id todo-agents --app-port 8001 --dapr-http-port 3500 --dapr-grpc-port 50001 python -m agents.main
```

2. Run the agent services:
```bash
# In separate terminals
python -m agents.scheduler
python -m agents.priority
python -m agents.reminder
```

### Phase V: Cloud-Native Deployment
1. Build Docker images:
```bash
docker build -t todo-evolution/api -f ./infra/docker/Dockerfile.api .
docker build -t todo-evolution/ui -f ./infra/docker/Dockerfile.ui .
docker build -t todo-evolution/agents -f ./infra/docker/Dockerfile.agents .
```

2. Deploy to Kubernetes:
```bash
kubectl apply -f ./infra/k8s/
helm install todo-evolution ./infra/helm/
```

## Understanding the Architecture

### Core Principles
The project follows the 7 core principles defined in the constitution:

1. **Spec-First Architecture**: All features originate from well-defined specifications
2. **Iterative Spec Refinement**: Implementations are generated through spec refinement
3. **Separation of Concerns**: Clear separation between specs and implementation
4. **Backward Compatibility**: All phase transitions maintain compatibility
5. **AI-Centric Design**: System interactions designed with AI agents in mind
6. **Cloud-Native by Design**: Architecture designed for cloud environments
7. **Observability First**: Comprehensive monitoring built from the ground up

### Data Model Evolution
The TodoTask data model evolves through 5 phases:
- Phase I: Basic task with title, description, status
- Phase II: Added user association and basic metadata
- Phase III: Added priority and tags
- Phase IV: Added scheduling, assignment, and recurrence
- Phase V: Added metadata and versioning for distributed systems

## Development Workflow

### Adding New Features
1. Update the specification in `specs/[feature]/spec.md`
2. Update the constitution if architectural changes are needed
3. Regenerate the implementation plan with `/sp.plan`
4. Create tasks with `/sp.tasks`
5. Implement following the generated tasks

### Testing
Run tests for each phase:
```bash
# Phase I & II (Python)
pytest tests/unit/
pytest tests/integration/

# Phase III (UI)
npm run test
npm run test:e2e

# Phase V (Infrastructure)
kubectl get pods  # Check deployment status
```

### Contributing
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make changes following the constitution principles
3. Add tests for your changes
4. Update documentation as needed
5. Submit a pull request with a clear description of changes

## Troubleshooting

### Common Issues
1. **Dependency conflicts**: Use virtual environments and ensure correct Python version
2. **Database connection errors**: Verify DATABASE_URL in environment variables
3. **Port conflicts**: Check if ports 8000, 3000, 3500 are available
4. **Dapr not running**: Ensure Dapr runtime is installed and started

### Useful Commands
```bash
# Check system status
dapr status
kubectl get pods

# Reset database
python -c "from src.db.init import reset_db; reset_db()"

# View logs
dapr logs todo-agents
kubectl logs -f deployment/todo-api
```

## Next Steps
1. Explore the detailed documentation in the `docs/` directory
2. Review the constitution in `specs/002-todo-evolution-constitution/constitution.md`
3. Look at the implementation plans in `specs/*/plan.md`
4. Check the data models in `specs/*/data-model.md`
5. Review the API contracts in `specs/*/contracts/`