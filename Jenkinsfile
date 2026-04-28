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
                git 'https://github.com/ShreyaMohite1117/devops-experiment9.git'
            }
        }

        stage('Build Images') {
            steps {
                bat 'docker build -t %DOCKER_HUB%/%BACKEND_IMAGE%:latest backend'
                bat 'docker build -t %DOCKER_HUB%/%FRONTEND_IMAGE%:latest frontend'
            }
        }

        stage('Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat 'echo %PASS% | docker login -u %USER% --password-stdin'
                    bat 'docker push %DOCKER_HUB%/%BACKEND_IMAGE%:latest'
                    bat 'docker push %DOCKER_HUB%/%FRONTEND_IMAGE%:latest'
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