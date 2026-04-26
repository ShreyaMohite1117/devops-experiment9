pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-app"
        IMAGE_TAG  = "latest"
    }

    stages {
        stage('Clone') {
            steps {
                echo 'Cloning from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running container test...'
                sh '''
                    docker run -d --name test-app -p 5009:5009 ${IMAGE_NAME}:${IMAGE_TAG}
                    sleep 3
                    curl -f http://localhost:5009/health || exit 1
                    docker stop test-app && docker rm test-app
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
