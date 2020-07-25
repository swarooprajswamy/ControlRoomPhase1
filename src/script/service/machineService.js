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
        machinesInstance.get('/machine/api')
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

        // return { 
        //     "data": [
        //         {
        //             "id": 13,
        //             "name": "SWL1800",
        //             "description": "Machine 001 for bots",
        //             "machineKey": "bcee3276-aef3-11ea-a304-80e82cbad5ed",
        //             "lastAvailable": "2020-06-15T18:14:35.306628Z",
        //             "status": {
        //                 "id": 9,
        //                 "name": "CONNECTED",
        //                 "active": true
        //             }
        //         },
        //         {
        //             "id": 14,
        //             "name": "ELW4667",
        //             "description": "Machine 002 for running bots",
        //             "machineKey": "cfa82c74-aef3-11ea-9561-80e82cbad5ed",
        //             "lastAvailable": "2020-06-15T10:34:37.241253Z",
        //             "status": {
        //                 "id": 7,
        //                 "name": "UNAVAILABLE",
        //                 "active": true
        //             }
        //         },
        //         {
        //             "id": 15,
        //             "name": "Test001",
        //             "description": "Machine 003 for running bots",
        //             "machineKey": "e85df840-aef3-11ea-be31-80e82cbad5ed",
        //             "lastAvailable": "2020-06-15T10:35:18.698987Z",
        //             "status": {
        //                 "id": 7,
        //                 "name": "UNAVAILABLE",
        //                 "active": true
        //             }
        //         },
        //         {
        //             "id": 16,
        //             "name": "Testing 002",
        //             "description": "Machine 004 for running bots",
        //             "machineKey": "f3574d10-aef3-11ea-a3b4-80e82cbad5ed",
        //             "lastAvailable": "2020-06-15T10:35:37.109224Z",
        //             "status": {
        //                 "id": 7,
        //                 "name": "UNAVAILABLE",
        //                 "active": true
        //             }
        //         }
        //     ]
        // }
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