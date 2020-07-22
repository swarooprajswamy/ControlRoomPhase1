import axios from 'axios'

const jobsInstance = axios.create({
    baseURL: 'https://rf-controlroom.azurewebsites.net/'
});

jobsInstance.defaults.headers.common['CustomPostHeaders'] = 'Custom Post header';
jobsInstance.defaults.headers.common['Authorization'] = 'Token 7cbb8c5cb7385671e03c8d75b9ba137ffd973bfe';


export default class Jobs {
    constructor() {
        this.errors = {};
    }
	getJobs() {
        // const jobs = [];
        // jobsInstance.get('/job/api')
        // .then(success => {
        //     const res = success.data
        //     let job = [];
        //     for (const key in res) {
        //       if (Object.prototype.hasOwnProperty.call(res, key)) {
        //         job.id = key;
        //         job.Process = res[key].Process;
        //         job.Robot = res[key].Robot;
        //         job.Enivronment = res[key].Enivronment;
        //         job.State = res[key].State;
        //         job.Started = res[key].Started;
        //         job.Ended = res[key].Ended;
        //         job.Source = res[key].Source;
        //         jobs.push(job);
        //         job = {};
        //       }
        //     }
        //   }
        // )
        // .catch(error => console.log(error));
        // return jobs;    
        return { 
          "data": 
          [
            {
                "id": 1,
                "name": "My First Job",
                "machine": {
                    "id": 13,
                    "name": "SWL1800"
                },
                "package": {
                    "id": 20,
                    "name": "Send Mail Via Outlook"
                },
                "status": {
                    "id": 4,
                    "name": "SUCCESSFUL",
                    "active": true
                },
                "startedOn": "2020-06-15T18:02:12.588354Z",
                "action": "https://www.evry.in/"
            },
            {
                "id": 2,
                "name": "Execute Loan varification",
                "machine": {
                    "id": 13,
                    "name": "SWL1800"
                },
                "package": {
                    "id": 21,
                    "name": "Mail Sender From outlook"
                },
                "status": {
                    "id": 4,
                    "name": "SUCCESSFUL",
                    "active": true
                },
                "startedOn": "2020-06-15T18:04:05.832285Z",
                "action": "https://www.evry.in/"
            },
            {
                "id": 3,
                "name": "Varify Pending Approvals",
                "machine": {
                    "id": 14,
                    "name": "ELW4667"
                },
                "package": {
                    "id": 19,
                    "name": "Testing package"
                },
                "status": null,
                "startedOn": null,
                "action": "https://www.evry.in/"
            },
            {
                "id": 4,
                "name": "Resume process",
                "machine": {
                    "id": 13,
                    "name": "SWL1800"
                },
                "package": {
                    "id": 19,
                    "name": "Testing package"
                },
                "status": {
                    "id": 6,
                    "name": "ERROR",
                    "active": true
                },
                "startedOn": "2020-06-15T18:06:15.074875Z",
                "action": "https://www.evry.in/"
            }
        ]
    }
	}
}