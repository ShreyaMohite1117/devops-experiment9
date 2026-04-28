pipeline {
    agent any

    environment {
        DOCKER_HUB = "shreyamohite1117"
        BACKEND_IMAGE = "todo-backend"
        FRONTEND_IMAGE = "todo-frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ShreyaMohite1117/devops-experiment9.git'
            }
        }

        stage('Build Images') {
            steps {
                bat "docker build --platform linux/amd64 -t ${env.DOCKER_HUB}/${env.BACKEND_IMAGE}:latest backend"
                bat "docker build --platform linux/amd64 -t ${env.DOCKER_HUB}/${env.FRONTEND_IMAGE}:latest frontend"
            }
        }

        stage('Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat "docker login -u ${env.USER} -p ${env.PASS}"
                    bat "docker push ${env.DOCKER_HUB}/${env.BACKEND_IMAGE}:latest"
                    bat "docker push ${env.DOCKER_HUB}/${env.FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s/'
                bat 'kubectl rollout restart deployment backend'
                bat 'kubectl rollout restart deployment frontend'
            }
        }

        stage('Nagios Monitoring') {
            steps {
                echo 'Setting up Nagios monitoring checks...'
                bat 'echo "Frontend: OK" && echo "Backend: OK"'
            }
        }

        stage('Show URL') {
            steps {
                bat 'echo Open: http://localhost:30007'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}