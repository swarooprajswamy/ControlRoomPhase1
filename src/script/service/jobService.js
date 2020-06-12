import axios from 'axios'

const jobsInstance = axios.create({
    baseURL: 'https://vuejshttp-ef355.firebaseio.com'
});

jobsInstance.defaults.headers.common['CustomPostHeaders'] = 'Custom Post header';



export default class Jobs {
    constructor() {
        this.errors = {};
    }
	getJobs() {
        const jobs = [];
        jobsInstance.get('/Jobs.json')
        .then(success => {
            const res = success.data
            let job = [];
            for (const key in res) {
              if (Object.prototype.hasOwnProperty.call(res, key)) {
                job.id = key;
                job.Process = res[key].Process;
                job.Robot = res[key].Robot;
                job.Enivronment = res[key].Enivronment;
                job.State = res[key].State;
                job.Started = res[key].Started;
                job.Ended = res[key].Ended;
                job.Source = res[key].Source;
                jobs.push(job);
                job = {};
              }
            }
          }
        )
        .catch(error => console.log(error));
        return jobs;    
	}
}