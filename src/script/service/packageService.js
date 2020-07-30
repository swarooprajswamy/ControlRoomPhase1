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
        packagesInstance.get('/package/api/')
        .then(success => {
            const res = success.data
            let packageq = [];
            for (const key in res) {
              if (Object.prototype.hasOwnProperty.call(res, key)) {
                packageq.id = res[key].id;
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
    }
    
    onSave(packages){
        packagesInstance.post('package/api/', packages)
        .then(success => { console.log(success); })
        .catch(error => console.log(error));
    }
    
    onUploadPackageFile(packages){
      packagesInstance.post('package/api/upload/', packages)
      .then(function(){
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
  }
}