import axios from 'axios'

const jobsInstance = axios.create({
    baseURL: 'https://rf-controlroom.azurewebsites.net/'
});

// jobsInstance.defaults.headers.common['CustomPostHeaders'] = 'Custom Post header';
jobsInstance.defaults.headers.common['Authorization'] = 'Token 7cbb8c5cb7385671e03c8d75b9ba137ffd973bfe';


export default class Jobs {
    constructor() {
        this.errors = {};
    }
	getJobs() {
        const jobs = [];
        jobsInstance.get('job/api/')
        .then(success => {
            const res = success.data
            let job = []
            for (const key in res) {
              if (Object.prototype.hasOwnProperty.call(res, key)) {
                job.id = key;
                job.name = res[key].name;
                job.machine = res[key].machine;
                job.package = res[key].package;
                job.status = res[key].status;
                job.startedOn = res[key].startedOn;
                jobs.push(job);
                job = {};
              }
            }
          }
        )
        .catch(error => console.log(error));
        return jobs;    
    //     return { 
    //       "data": 
    //       [
    //         {
    //             "id": 1,
    //             "name": "My First Job",
    //             "machine": {
    //                 "id": 13,
    //                 "name": "SWL1800"
    //             },
    //             "package": {
    //                 "id": 20,
    //                 "name": "Send Mail Via Outlook"
    //             },
    //             "status": {
    //                 "id": 4,
    //                 "name": "SUCCESSFUL",
    //                 "active": true
    //             },
    //             "startedOn": "2020-06-15T18:02:12.588354Z",
    //             "action": "https://rf-controlroom.azurewebsites.net/job/27/start"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Execute Loan varification",
    //             "machine": {
    //                 "id": 13,
    //                 "name": "SWL1800"
    //             },
    //             "package": {
    //                 "id": 21,
    //                 "name": "Mail Sender From outlook"
    //             },
    //             "status": {
    //                 "id": 4,
    //                 "name": "SUCCESSFUL",
    //                 "active": true
    //             },
    //             "startedOn": "2020-06-15T18:04:05.832285Z",
    //             "action": "https://www.evry.in/"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Varify Pending Approvals",
    //             "machine": {
    //                 "id": 14,
    //                 "name": "ELW4667"
    //             },
    //             "package": {
    //                 "id": 19,
    //                 "name": "Testing package"
    //             },
    //             "status": null,
    //             "startedOn": null,
    //             "action": "https://www.evry.in/"
    //         },
    //         {
    //             "id": 4,
    //             "name": "Resume process",
    //             "machine": {
    //                 "id": 13,
    //                 "name": "SWL1800"
    //             },
    //             "package": {
    //                 "id": 19,
    //                 "name": "Testing package"
    //             },
    //             "status": {
    //                 "id": 6,
    //                 "name": "ERROR",
    //                 "active": true
    //             },
    //             "startedOn": "2020-06-15T18:06:15.074875Z",
    //             "action": "https://www.evry.in/"
    //         }
    //     ]
    // }
    }

    getMachine() {
        const machines = [];
        jobsInstance.get('machine/api/')
        .then(success => {
            const res = success.data;
            let machine = [];
            for (const key in res) {
              if (Object.prototype.hasOwnProperty.call(res, key)) {
                machine.id = key;
                machine.name = res[key].name;
                machines.push(machine);
                machine = {};
              }
            }
          }
        )
        .catch(error => console.log(error));
        let machine = [];
        machine.id = 0;
        machine.name = "------------------";
        machines.push(machine);
        return machines;    
    }

    getPackage() {
        const packages = [];
        jobsInstance.get('package/api/')
        .then(success => {
            let packageq = [];
            const res = success.data;
            for (const key in res) {
                    if (Object.prototype.hasOwnProperty.call(res, key)) {
                    packageq.id = key;
                    packageq.name = res[key].name;
                    packages.push(packageq);
                    packageq = {};
                    }
                }
            }
        )
        .catch(error => console.log(error));
        let packageq = [];
        packageq.id = 0;
        packageq.name = "------------------";
        packages.push(packageq);
        return packages;    
    }    
        
    onSave(job){
        jobsInstance.post('job/api/', job)
        .then(success => { console.log(success); })
        .catch(error => console.log(error));
    }

    onRunJob(url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url);
        Http.send();

        Http.onload = function() {
        console.log(`Loaded: ${Http.status} ${Http.response}`);
        };

        Http.onerror = function() { // only triggers if the request couldn't be made at all
        console.log(`Network Error`);
        };

        Http.onprogress = function(event) { // triggers periodically
        // event.loaded - how many bytes downloaded
        // event.lengthComputable = true if the server sent Content-Length header
        // event.total - total number of bytes (if lengthComputable)
        console.log(`Received ${event.loaded} of ${event.total}`);
        };
    }
}