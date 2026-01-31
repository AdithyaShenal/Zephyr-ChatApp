const AboutPage = () => {
  return (
    <>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              About This Project
            </h1>
            <p className="text-lg text-slate-600">
              Zephyr - A Real-Time Chat Application
            </p>
          </div>

          {/* Project Overview */}
          <div className="rounded-lg p-8 mb-8 border">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              What is This Project?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Zephyr is a modern, real-time chat application built with a focus
              on performance, scalability, and user experience. The application
              enables users to register, connect with friends, and engage in
              seamless real-time conversations. Built using a hybrid
              architecture combining Socket.io, Express, and RESTful APIs,
              Zephyr demonstrates advanced full-stack development practices
              including real-time communication, caching strategies, background
              job processing, containerization, and type-safe development with
              TypeScript.
            </p>
          </div>

          {/* Key Functionalities */}
          <div className="rounded-md p-8 mb-8 border">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Key Functionalities
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Secure Authentication & Authorization
                  </h3>
                  <p className="text-slate-600">
                    Complete user registration and login system secured with JWT
                    (JSON Web Tokens) for stateless authentication, ensuring
                    secure access to the platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Real-Time Friend Request System
                  </h3>
                  <p className="text-slate-600">
                    Browse users, send friend requests, and receive instant
                    notifications. Accept, reject, or cancel friend requests in
                    real-time using Socket.io for immediate updates.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Instant Messaging
                  </h3>
                  <p className="text-slate-600">
                    Real-time chat functionality powered by a hybrid
                    architecture combining Socket.io and Express. Messages are
                    delivered instantly with typing indicators and delivery
                    status.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Advanced User Presence
                  </h3>
                  <p className="text-slate-600">
                    Track online/offline status, last seen timestamps, and view
                    the last message preview for each conversation. All presence
                    data updates in real-time.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    High-Performance Caching
                  </h3>
                  <p className="text-slate-600">
                    Redis-powered caching layer that reduces average API
                    response time by 40%, ensuring lightning-fast data retrieval
                    and improved user experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Background Job Processing
                  </h3>
                  <p className="text-slate-600">
                    Non-critical tasks like notifications and data cleanup are
                    handled asynchronously using BullMQ workers on top of Redis,
                    keeping the main application responsive.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Cloud-Based Media Storage
                  </h3>
                  <p className="text-slate-600">
                    Profile images are securely stored and optimized using
                    Cloudinary, providing fast delivery and automatic image
                    optimization.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Idempotent API Design
                  </h3>
                  <p className="text-slate-600">
                    All endpoints are designed to be idempotent, ensuring safe
                    retries and preventing duplicate operations even in unstable
                    network conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="rounded-md p-8 mb-8 border">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Technologies Used
            </h2>

            <div className="flex flex-col gap-8">
              {/* Frontend */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Frontend Technologies
                </h3>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/react"
                      alt="React"
                    />
                    <p className="text-sm my-2">React 19</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/typescript"
                      alt="TypeScript"
                    />
                    <p className="text-sm my-2">TypeScript</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/vite"
                      alt="Vite"
                    />
                    <p className="text-sm my-2">Vite</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/tailwindcss"
                      alt="Tailwind CSS"
                    />
                    <p className="text-sm my-2">Tailwind CSS</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/shadcnui"
                      alt="shadcn/ui"
                    />
                    <p className="text-sm my-2">shadcn/ui</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/reactquery"
                      alt="React Query"
                    />
                    <p className="text-sm my-2">React Query</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/zod"
                      alt="Zod"
                    />
                    <p className="text-sm my-2">Zod</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/lucide"
                      alt="Lucide React"
                    />
                    <p className="text-sm my-2">Lucide React</p>
                  </div>
                </div>
              </div>

              {/* Backend */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Backend Technologies
                </h3>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/nodedotjs"
                      alt="Node.js"
                    />
                    <p className="text-sm my-2">Node.js</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/typescript"
                      alt="TypeScript"
                    />
                    <p className="text-sm my-2">TypeScript</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/tsnode"
                      alt="ts-node"
                    />
                    <p className="text-sm my-2">ts-node</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/express"
                      alt="Express"
                    />
                    <p className="text-sm my-2">Express 5</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/socketdotio"
                      alt="Socket.io"
                    />
                    <p className="text-sm my-2">Socket.io</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/zod"
                      alt="Zod"
                    />
                    <p className="text-sm my-2">Zod</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/jsonwebtokens"
                      alt="JWT"
                    />
                    <p className="text-sm my-2">JWT</p>
                  </div>
                </div>
              </div>

              {/* Database & Caching */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Database & Caching
                </h3>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/mongodb"
                      alt="MongoDB"
                    />
                    <p className="text-sm my-2">MongoDB</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/redis"
                      alt="Redis"
                    />
                    <p className="text-sm my-2">Redis</p>
                  </div>
                </div>
              </div>

              {/* Cloud Services */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Cloud Services & Domain Registrar
                </h3>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/cloudinary"
                      alt="Cloudinary"
                    />
                    <p className="text-sm my-2">Cloudinary</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/digitalocean"
                      alt="Digital Ocean"
                    />
                    <p className="text-sm my-2">Digital Ocean</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/namecheap"
                      alt="Digital Ocean"
                    />
                    <p className="text-sm my-2">Namecheap</p>
                  </div>
                </div>
              </div>

              {/* DevOps & CI/CD */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">
                  DevOps & CI/CD
                </h3>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/docker"
                      alt="Docker"
                    />
                    <p className="text-sm my-2">Docker</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/nginx"
                      alt="Nginx"
                    />
                    <p className="text-sm my-2">Nginx</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/githubactions"
                      alt="GitHub Actions"
                    />
                    <p className="text-sm my-2">GitHub Actions</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/git"
                      alt="Git"
                    />
                    <p className="text-sm my-2">Git</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <img
                      width="40"
                      height="40"
                      src="https://cdn.simpleicons.org/github"
                      alt="GitHub"
                    />
                    <p className="text-sm my-2">GitHub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture & Design Patterns */}
          <div className="rounded-md p-8 mb-8 border">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Architecture & Design Patterns
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">◆</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Modular Monolith Architecture
                  </h3>
                  <p className="text-slate-600">
                    The application follows a modular monolith pattern,
                    organizing code into well-defined modules with clear
                    boundaries while maintaining the simplicity of a monolithic
                    deployment.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">◆</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Microservices with Docker Compose
                  </h3>
                  <p className="text-slate-600">
                    The system is containerized using Docker Compose with
                    multiple services: Redis for caching and job queues, Node.js
                    API server, React client hosted on Nginx, and Nginx as the
                    main router. Each service runs in its own container for
                    isolation and scalability.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">◆</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Hybrid Communication Pattern
                  </h3>
                  <p className="text-slate-600">
                    Combines Socket.io for real-time bidirectional communication
                    with RESTful APIs for standard CRUD operations, leveraging
                    the strengths of both approaches.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">◆</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Caching Strategy with Redis
                  </h3>
                  <p className="text-slate-600">
                    Implements a comprehensive caching layer using Redis,
                    achieving a 40% reduction in average response time by
                    caching frequently accessed data and reducing database load.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">◆</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Background Job Processing with BullMQ
                  </h3>
                  <p className="text-slate-600">
                    Non-primary tasks such as sending notifications, cleanup
                    operations, and analytics are offloaded to background
                    workers using BullMQ, ensuring the main application remains
                    responsive.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">◆</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Type-Safe Development
                  </h3>
                  <p className="text-slate-600">
                    Built entirely with TypeScript on both frontend and backend,
                    providing compile-time type checking, better developer
                    experience, and reduced runtime errors.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">◆</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Idempotent API Design
                  </h3>
                  <p className="text-slate-600">
                    All endpoints are designed following idempotency principles,
                    ensuring that repeated requests have the same effect as a
                    single request, crucial for reliability in distributed
                    systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deployment & Infrastructure */}
          <div className="rounded-md p-8 mb-8 border">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Deployment & Infrastructure
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">☁</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Automated CI/CD Pipeline
                  </h3>
                  <p className="text-slate-600">
                    Implemented GitHub Actions for continuous integration and
                    deployment. The pipeline automatically builds Docker images,
                    pushes them to Docker Hub, and deploys to Digital Ocean
                    droplet on every commit to the main branch.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">☁</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Production Hosting
                  </h3>
                  <p className="text-slate-600">
                    Hosted on Digital Ocean Docker Droplet with custom domain
                    from Namecheap. The application runs in containerized
                    environment with Nginx handling SSL termination and reverse
                    proxy routing.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">☁</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Container Orchestration
                  </h3>
                  <p className="text-slate-600">
                    Docker Compose orchestrates multiple services including
                    Redis cache, Node.js API, React frontend served by Nginx,
                    and Nginx router. All services communicate through a Docker
                    network for secure internal communication.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Highlight */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Why This Project?</h2>
            <p className="leading-relaxed mb-4">
              Zephyr showcases advanced full-stack development skills,
              demonstrating expertise in building real-time applications with
              modern technologies. The project highlights proficiency in system
              architecture, performance optimization, real-time communication
              protocols, containerization, and scalable backend design.
            </p>
            <p className="leading-relaxed">
              From implementing efficient caching strategies that improve
              response times by 40% to architecting a hybrid communication
              system combining WebSockets and REST, to deploying a fully
              containerized multi-service application with automated CI/CD
              pipeline, this project represents a comprehensive understanding of
              modern web application development, DevOps practices, and
              production-ready code quality.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
