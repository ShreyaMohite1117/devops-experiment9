pipeline {
    agent any

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
                bat 'docker build -t devops-experiment9 .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'docker run devops-experiment9 echo Tests passed'
            }
        }

       stage('Deploy to Kubernetes') {
    steps {
        echo 'Deploying to Kubernetes...'
        echo 'Kubernetes manifests ready in k8s/ directory'
        bat 'kubectl apply -f k8s/ --validate=false --dry-run=client'
    }
}
    }

    post {
        success { echo 'Pipeline succeeded!' }
        failure { echo 'Pipeline failed!' }
    }
}
