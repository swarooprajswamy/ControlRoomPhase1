import axios from 'axios'

const machinesInstance = axios.create({
    baseURL: 'https://rf-controlroom.azurewebsites.net/'
});

machinesInstance.defaults.headers.common['Authorization'] = 'Token 7cbb8c5cb7385671e03c8d75b9ba137ffd973bfe';



export default class Machine {
    constructor() {
        this.errors = {};
    }
	getMachine() {
        const machines = [];
        machinesInstance.get('/machine/api/')
        .then(success => {
            const res = success.data
            let machine = [];
            for (const key in res) {
              if (Object.prototype.hasOwnProperty.call(res, key)) {
                machine.id = key;
                machine.name = res[key].name;
                machine.description = res[key].description;
                machine.machineKey = res[key].machineKey;
                machine.lastAvailable = res[key].lastAvailable;
                machine.status = res[key].status;
                machines.push(machine);
                machine = {};
              }
            }
          }
        )
        .catch(error => console.log(error));
        return machines;    
    }
    
    onSave(machine){
        machinesInstance.post('machine/api/', machine)
        .then(success => { console.log(success); })
        .catch(error => console.log(error));
    }

    getGUID() {
        let rand = Math.random;
        var nbr, randStr = "";
        do {
            randStr += (nbr = rand()).toString(16).substr(3, 6);
        } while (randStr.length < 30);
        return (
            randStr.substr(0, 8) + "-" +
            randStr.substr(8, 4) + "-4" +
            randStr.substr(12, 3) + "-" +
            ((nbr*4|0)+8).toString(16) + // [89ab]
            randStr.substr(15, 3) + "-" +
            randStr.substr(18, 12)
        );
    }
}