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
                    job.id = res[key].id;
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
        }

        getMachine() {
            const machines = [];
            jobsInstance.get('machine/api/')
            .then(success => {
                const res = success.data;
                let machine = [];
                for (const key in res) {
                  if (Object.prototype.hasOwnProperty.call(res, key)) {
                    machine.id = res[key].id;
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
                        packageq.id = res[key].id;
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