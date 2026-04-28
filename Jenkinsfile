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
                git 'https://github.com/ShreyaMohite1117/devops-experiment9.git'
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                echo "Building Backend Image..."
                docker build -t $DOCKER_HUB/$BACKEND_IMAGE:$TAG ./backend

                echo "Building Frontend Image..."
                docker build -t $DOCKER_HUB/$FRONTEND_IMAGE:$TAG ./frontend
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
                    sh '''
                    echo "Logging into DockerHub..."
                    echo $PASS | docker login -u $USER --password-stdin

                    echo "Pushing Images..."
                    docker push $DOCKER_HUB/$BACKEND_IMAGE:$TAG
                    docker push $DOCKER_HUB/$FRONTEND_IMAGE:$TAG
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                echo "Applying Kubernetes configs..."
                kubectl apply -f k8s/

                echo "Waiting for pods..."
                sleep 10

                echo "===== POD STATUS ====="
                kubectl get pods -o wide

                echo "===== SERVICES ====="
                kubectl get svc

                echo "===== DESCRIBE FRONTEND SERVICE ====="
                kubectl describe svc frontend-service

                echo "===== NODE INFO ====="
                kubectl get nodes -o wide
                '''
            }
        }

        stage('Show Access URL') {
            steps {
                sh '''
                echo "==============================="
                echo "APPLICATION ACCESS INFO"
                echo "==============================="

                NODE_PORT=$(kubectl get svc frontend-service -o jsonpath='{.spec.ports[0].nodePort}')
                NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[0].address}')

                echo "Frontend URL: http://$NODE_IP:$NODE_PORT"
                echo "Backend Service: backend-service:5000"
                echo "==============================="
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