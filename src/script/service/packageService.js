import axios from 'axios'

const packagesInstance = axios.create({
    baseURL: 'https://rf-controlroom.azurewebsites.net/'
});

packagesInstance.defaults.headers.common['Authorization'] = 'Token 7cbb8c5cb7385671e03c8d75b9ba137ffd973bfe';



export default class Package {
    constructor() {
        this.errors = {};
    }
	getPackage() {
        const packages = [];
        packagesInstance.get('/package/api')
        .then(success => {
            const res = success.data
            let packageq = [];
            for (const key in res) {
              if (Object.prototype.hasOwnProperty.call(res, key)) {
                packageq.id = key;
                packageq.name = res[key].name;
                packageq.description = res[key].description;
                packageq.version = res[key].version;
                packageq.packageFile = res[key].packageFile;
                packages.push(packageq);
                packageq = {};
              }
            }
          }
        )
        .catch(error => console.log(error));
        return packages;    

        // return { 
        //     "data": [
        //         {
        //             "id": 19,
        //             "name": "Testing package",
        //             "description": "some desc",
        //             "version": "1.0",
        //             "packageFile": "https://rf-controlroom.azurewebsites.net/package/api/51/getfile"
        //         },
        //         {
        //             "id": 20,
        //             "name": "Send Mail Via Outlook",
        //             "description": "Send mail using Outlook with logged in credential",
        //             "version": "1.0",
        //             "packageFile": "http://127.0.0.1:8000/media/packages/Outlook.robot"
        //         },
        //         {
        //             "id": 21,
        //             "name": "Mail Sender From outlook",
        //             "description": "sending mail using outlook",
        //             "version": "1.0",
        //             "packageFile": "http://127.0.0.1:8000/media/packages/Outlook_wf7CUL3.robot"
        //         },
        //         {
        //             "id": 22,
        //             "name": "Pending Event Process",
        //             "description": "Process all the pending event for processing",
        //             "version": "1.0",
        //             "packageFile": "http://127.0.0.1:8000/media/packages/browse_check_NqhDDnv.robot"
        //         },
        //         {
        //             "id": 23,
        //             "name": "HR Varification of new people",
        //             "description": "varify all the due new joinees",
        //             "version": "0.0",
        //             "packageFile": 'null'
        //         }
        //     ]
        // }
    }
    
    onSave(packages){
        packagesInstance.post('package/api/', packages)
        .then(success => { console.log(success); })
        .catch(error => console.log(error));
    }
}