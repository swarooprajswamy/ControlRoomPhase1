import axios from 'axios'

const packagesInstance = axios.create({
    baseURL: 'https://vuejshttp-ef355.firebaseio.com'
});

packagesInstance.defaults.headers.common['CustomPostHeaders'] = 'Custom Post header';



export default class Package {
    constructor() {
        this.errors = {};
    }
	getPackage() {
        // const packages = [];
        // packagesInstance.get('/Packages.json')
        // .then(success => {
        //     const res = success.data
        //     let package = [];
        //     for (const key in res) {
        //       if (Object.prototype.hasOwnProperty.call(res, key)) {
        //         package.id = key;
        //         package.name = res[key].name;
        //         package.description = res[key].description;
        //         package.version = res[key].version;
        //         package.packageFile = res[key].packageFile;
        //         packages.push(package);
        //         package = {};
        //       }
        //     }
        //   }
        // )
        // .catch(error => console.log(error));
        // return packages;    

        return { 
            "data": [
                {
                    "id": 19,
                    "name": "Testing package",
                    "description": "some desc",
                    "version": "1.0",
                    "packageFile": "http://127.0.0.1:8000/media/packages/Outlook_aZRPlWe.robot"
                },
                {
                    "id": 20,
                    "name": "Send Mail Via Outlook",
                    "description": "Send mail using Outlook with logged in credential",
                    "version": "1.0",
                    "packageFile": "http://127.0.0.1:8000/media/packages/Outlook.robot"
                },
                {
                    "id": 21,
                    "name": "Mail Sender From outlook",
                    "description": "sending mail using outlook",
                    "version": "1.0",
                    "packageFile": "http://127.0.0.1:8000/media/packages/Outlook_wf7CUL3.robot"
                },
                {
                    "id": 22,
                    "name": "Pending Event Process",
                    "description": "Process all the pending event for processing",
                    "version": "1.0",
                    "packageFile": "http://127.0.0.1:8000/media/packages/browse_check_NqhDDnv.robot"
                },
                {
                    "id": 23,
                    "name": "HR Varification of new people",
                    "description": "varify all the due new joinees",
                    "version": "0.0",
                    "packageFile": 'null'
                }
            ]
        }
	}
}