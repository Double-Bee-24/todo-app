# Todo app

Todo app with task management features. It uses NestJS, TypeORM with PostgreSQL for the backend and Next.js for the frontend, deployed on AWS EC2. You can access it here: https://todo.bbilokin.online/

## Prerequisites

To run this project you need to have installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Make sure that Docker Engine is running

## Technologies

- **NestJS**: A framework for building server-side applications in Node.js. Built on top of ExpressJS.
- **PostgreSQL**: A relational database management system.
- **TypeORM**: An ORM for working with PostgreSQL.
- **React**: A library for building user interfaces.
- **Next.js**: A React framework for server-side rendering, static site generation, and fullstack applications.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **shadcn/ui**: A component library built on top of Radix UI and TailwindCSS for accessible and customizable UI components.
- **TypeScript**: A superset of JavaScript that provides stricter type safety.
- **Nestia**: A library that helps with data validation in TypeScript.
- **ESLint**: A static code analysis tool for finding problems in your code.
- **Prettier**: A code formatter for maintaining consistent style.
- **Swagger**: A tool for API interaction and automatic documentation generation.
- **REST**: An architectural style for interacting with web services.
- **Docker**: A tool to run your code in isolated environments.
- **Docker Compose**: Simpler way to configure app with multiple containers.
- **Caddy**:

  - Used to reverse proxy requests on different services
  - Automatically updates TLS certificate (domain name required)

## Features

* [x] Display a list of all tasks
* [x] Add a new task
* [x] Remove a task
* [x] Search for tasks
* [x] Mark a task as done/undone
* [x] Filter tasks by status (**All / Done / Undone**)
* [x] Assign priority to tasks (**1–10**)
* [x] Sort tasks by priority (**ascending / descending**)

## Running the Project locally

### 1. Project Setup

1. Clone the repository:

```bash
   git clone https://github.com/Double-Bee-24/todo-app.git
```

### 2. Environment Setup for the Project

To simplify this step .env.example files were provided to both 'client' and 'server' folder. You can configure it up to your needs. Don't forget to remove '.example' part

### 3. Running the project

In the root folder execute the following command:

```bash
docker compose up --build
```

After the containers are up, enter the backend container and run database migrations:

```bash
docker exec -it todo_backend sh
npm run migration:run
```
