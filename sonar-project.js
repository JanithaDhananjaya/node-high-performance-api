import { scan } from 'sonarqube-scanner';

scan(
    {
        serverUrl: 'http://localhost:9000',
        options : {
            'sonar.projectKey': 'node-senior-api',
            'sonar.projectName': 'NodeJs Senior Api',
            'sonar.projectDescription': 'NodeJs Senior Api',
            'sonar.projectVersion': '1.0.0',
            'sonar.sources': 'src',
            'sonar.tests': 'src',
            'sonar.inclusions' : 'src/**', 
            'sonar.test.inclusions': 'src/__tests__/**/*.test.js',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
            'sonar.sourceEncoding': 'UTF-8',
        },
    }
).then(() => {
    console.log('SonarQube scan finished');
    process.exit();
}).catch((err) => {
    console.error('SonarQube scan failed:', err);
    process.exit(1);
});