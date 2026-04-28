pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/ShreyaMohite1117/devops-experiment9.git'
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t todo-app ./backend'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 5000:5000 todo-app'
            }
        }
    }
}