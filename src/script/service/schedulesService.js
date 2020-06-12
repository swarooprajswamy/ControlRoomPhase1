import axios from 'axios'

const schedulesInstance = axios.create({
    baseURL: 'https://vuejshttp-ef355.firebaseio.com'
});

schedulesInstance.defaults.headers.common['CustomPostHeaders'] = 'Custom Post header';



export default class Schedules {

	getSchedules() {
    const schedules = [];
	schedulesInstance.get('/Schedules.json')
        .then(success => {
            const res = success.data
            let schedule = [];
            for (const key in res) {
              if (Object.prototype.hasOwnProperty.call(res,key)) {
                schedule.id = key;
                schedule.Name = res[key].Name;
                schedule.Enivronment = res[key].Enivronment;
                schedule.NextRunTime = res[key].NextRunTime;
                schedule.Process = res[key].Process;
                schedule.StopAfter = res[key].StopAfter;
                schedules.push(schedule);
                schedule = {};
              }
            }
          }
        )
        .catch(error => console.log(error));
        return schedules;    
	}
}