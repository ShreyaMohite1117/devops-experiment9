pipeline {
    agent any

    environment {
        DOCKER_HUB = "shreyamohite1117"
        BACKEND_IMAGE = "todo-backend"
        FRONTEND_IMAGE = "todo-frontend"
        TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ShreyaMohite1117/devops-experiment9.git'
            }
        }

        stage('Build Images') {
            steps {
                bat '''
                echo Building Backend Image...
                docker build -t %DOCKER_HUB%/%BACKEND_IMAGE%:%TAG% backend

                echo Building Frontend Image...
                docker build -t %DOCKER_HUB%/%FRONTEND_IMAGE%:%TAG% frontend
                '''
            }
        }

        stage('Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat '''
                    echo Logging into DockerHub...
                    docker login -u %USER% -p %PASS%

                    echo Pushing Backend...
                    docker push %DOCKER_HUB%/%BACKEND_IMAGE%:%TAG%

                    echo Pushing Frontend...
                    docker push %DOCKER_HUB%/%FRONTEND_IMAGE%:%TAG%
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                echo Applying Kubernetes configs...
                kubectl apply -f k8s

                echo Waiting for pods...
                timeout /t 10

                echo ===== POD STATUS =====
                kubectl get pods -o wide

                echo ===== SERVICES =====
                kubectl get svc

                echo ===== NODE INFO =====
                kubectl get nodes -o wide
                '''
            }
        }

        stage('Show Access URL') {
            steps {
                bat '''
                echo ===============================
                echo APPLICATION ACCESS INFO
                echo ===============================

                kubectl get svc frontend-service

                echo Open in browser:
                echo http://localhost:30007
                echo ===============================
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment Successful!"
        }
        failure {
            echo "Deployment Failed!"
        }
    }
}