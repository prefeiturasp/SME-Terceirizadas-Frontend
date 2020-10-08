pipeline {
    agent {
      node {
        label 'sme-nodes10'
	    }
    }

    options {
      buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
      disableConcurrentBuilds()
      skipDefaultCheckout()
    }

    stages {


       stage('CheckOut') {
        steps {
          checkout scm
        }
       }

       stage('Testes') {
          steps {
                sh 'npm install'
                sh 'npm run-script coverage'
                sh 'npm run-script eslint'
                sh 'npm run-script prettier'

                sh 'npm install -g jshint'
                sh 'jshint --verbose --reporter=checkstyle src > checkstyle-jshint.xml || exit 0'
                checkstyle canComputeNew: false, defaultEncoding: '', healthy: '', pattern: '**/checkstyle-jshint.xml', unHealthy: ''

            }
        }

       stage('Analise codigo') {
          when {
              branch 'development'
            }
            steps {
                sh 'sonar-scanner \
                    -Dsonar.projectKey=SME-Terceirizadas-Front \
                    -Dsonar.sources=src \
                    -Dsonar.host.url=http://sonar.sme.prefeitura.sp.gov.br \
                    -Dsonar.login=c7cbf75fc22122f6c4a4cad32f625978a738cd18'
            }
        }

       stage('Build DEV') {
         when {
           branch 'development'
         }
        steps {
          sh 'echo build docker image desenvolvimento'

          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "8330ae17-d4e0-4ef1-9318-870559991170",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
           }
        }
       }

       stage('Deploy DEV') {
         when {
           branch 'development'
         }
        steps {



          sh 'echo Deploy ambiente desenvolvimento'
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "810baebb-1855-4911-ab1b-d8a19d7e4011",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }



        stage('Build HOM') {
         when {
           branch 'homolog'
         }
        steps {


          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "296be01b-2eab-415b-b6f2-bce1f7e35839",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }

       stage('Deploy HOM') {
         when {
           branch 'homolog'
         }
        steps {
          timeout(time: 24, unit: "HOURS") {
          // telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
            input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'marcos_nastri, calvin_rossinhole, ollyver_ottoboni, kelwy_oliveira, pedro_walter, rodolfo_lima, regis_santos'
          }
         sh 'echo Deploying ambiente homologacao'



          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,

              //JOB DE BUILD
              jobId: "a38d1b78-9461-4ed2-a3cb-a316e3cb5b04",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }


        stage('Build PROD') {
         when {
           branch 'master'
         }
        steps {

          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "bd4866f7-7b67-4860-bce2-68106775e3e4",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
              //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }

       stage('Deploy PROD') {
         when {
           branch 'master'
         }
        steps {
          timeout(time: 24, unit: "HOURS") {
          // telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
            input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'marcos_nastri, calvin_rossinhole, ollyver_ottoboni, kelwy_oliveira, pedro_walter, rodolfo_lima, regis_santos'
          }
            sh 'echo Build image docker Produção'


          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,

              //JOB DE DEPLOY
              jobId: "71be6128-4100-4d65-b0a5-b4dd45d91a14",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }
    }

  post {
    always {
      echo 'One way or another, I have finished'
    }
    success {
      telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Esta ok !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n\n Uma nova versão da aplicação esta disponivel!!!")
    }
    unstable {
      telegramSend("O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Esta instavel ...\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
    }
    failure {
      telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME}  - Quebrou. \nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
    }
    changed {
      echo 'Things were different before...'
    }
    aborted {
      telegramSend("O Build ${BUILD_DISPLAY_NAME} - Foi abortado.\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
    }
  }
}
