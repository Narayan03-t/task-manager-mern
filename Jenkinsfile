pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    COMPOSE_PROJECT_NAME = "task-manager"
    FRONTEND_IMAGE = "task-manager-frontend"
    BACKEND_IMAGE = "task-manager-backend"
    IMAGE_TAG = "${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        dir('backend') {
          sh 'npm ci'
        }
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir('frontend') {
          sh 'npm ci'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'npm run build'
        }
      }
    }

    stage('Smoke Check Backend') {
      steps {
        dir('backend') {
          sh 'node -e "require(\'./src/app\'); console.log(\'backend app loaded\')"'
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend"
        sh "docker build --build-arg VITE_API_BASE_URL=http://localhost:5000/api -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend"
      }
    }

    stage('Validate Compose File') {
      steps {
        sh 'docker compose config'
      }
    }

    stage('Deploy Application') {
    steps {
        sh 'docker compose down'
        sh 'docker compose up -d --build'
    }
}

  }

  post {
    always {
      archiveArtifacts artifacts: 'frontend/dist/**', allowEmptyArchive: true
    }
    success {
      echo 'Pipeline completed successfully.'
    }
    failure {
      echo 'Pipeline failed. Check the stage logs for details.'
    }
  }
}
