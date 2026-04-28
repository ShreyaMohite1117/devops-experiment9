pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/ShreyaMohite1117/devops-experiment9.git'
            }
        }

        stage('Build Docker') {
            steps {
                bat 'docker build -t todo-app ./backend'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 5000:5000 todo-app'
            }
        }
    }
}