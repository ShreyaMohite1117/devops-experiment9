pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-experiment9"
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo 'Cloning repository from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running container test...'
                bat "docker run %IMAGE_NAME% echo Tests passed"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying application to Kubernetes using WSL...'

                bat '''
                wsl kubectl get nodes
                wsl kubectl apply -f k8s/deployment.yaml
                wsl kubectl apply -f k8s/service.yaml
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}
