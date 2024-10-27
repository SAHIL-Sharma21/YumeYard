# Yume Yard

YumeYard is an open-source blog webapp that allows you to create and publish your own blogs. It is built with ReactJs, NodeJs, ExpressJs, Postgresql Docker, and Prisma.

### video link: 
[Video Link Demo](https://x.com/sahilsharma_ss/status/1784266011484520953)

## Features

- ```User Authentication```: Secure sign-up and login functionality.
- ```Blog Creation and Publishing```: Easily create and publish blogs with an intuitive editor.
- ```User Interaction```: Like and comment on other users' blogs to encourage engagement.
- ``Blog Sharing``: Share blog posts with others on the platform.


## Tech Stack
- ```Front End```: ReactJs, React-Router, TailwindCSS
- ```Back End```: NodeJs, ExpressJs, Prisma ORM
- ```Database```: PostgreSQL, managed within Docker for consistency and portability
- ```Deployment and Scaling```: Docker and Docker-Compose for streamlined environment setup.


## How to use

- Create an account
- Login
- Create a blog
- Share your blogs with other users
- Comment on other users' blogs
- Like other users' blogs


## Getting Started

### Prerequisites
- ```Nodejs``` >= 18.0 and ```npm``` >= 8.0 on your machine
- ```Docker``` and ```Docker-Compose``` for containerized environment

## Installation
 1. Clone the repository
 ```bash
 git clone https://github.com/sahilsharma-ss/YumeYard.git
 cd YumeYard
 ```
2. Install dependencies
```bash
npm install
```
3. Set up environment variables
Create ```.env``` file in root directory with necessary configurations, including PostgreSQL and JWT secret.

4. Start Docker container
```bash
docker compose up -d 
```
5. Start the development Server
```bash
npm run dev
```

## Usage
To access the website, open ``http://localhost:3000`` in your browser.

1. ``Signup`` or ``Login`` to your account
2. **Create a blog post**, and start enjoying the other users by sharing, commenting, and liking blogs.
3. **Manage Blogs** by adding, editing, and deleting them and publishing them.

## Folder Structure
```
YumeYard
├── Client
├── Server
├── docker-compose.yml
└── README.md
```
- ``Client``:Contains React components and Tailwind CSS for frontend styling.
- ``Server``: Handles API routes, authentication, and database interaction using Express and Prisma.
- ``docker-compose.yml``: Defines and runs the PostgreSQL container and backend services.

## Key Technical Highlights
- ``PERN Stack with Prisma ORM``: Provides a robust framework for efficient data handling and seamless database operations.
- ``Docker and Docker-Compose``: Ensures a consistent environment across development and deployment.
- ``TailwindCSS``: Modular and responsive design for a clean, modern user interface.
- ``RESTful API Design``: Enables CRUD operations for blogs and user interactions.


## Contributing

1. Fork the repository
2. Create a new branch (``feature/your-feature-name``)
3. Commit your changes (``git commit -m "Add your feature"``)
4. Push to the branch (``git push origin feature/your-feature-name``).
5. open a Pull Request

## License

Yume Yard is licensed under the MIT License. See ``LICENSE`` for more information.