<template>
    <div class="row" style="height: calc(100vh - 143px)">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="openDialog" /> -->
<!-- <Dialog header="Flex Scroll" :visible.sync="dialogVisible" :style="{width: '50vw'}" :maximizable="true" :modal="true" :contentStyle="{height: '300px'}"> -->
      <div class="p-card">
        <div class="p-card-body" style="padding:0">
          <DataTable 
          :value="packages" 
          :paginator="true"
          :rows="10"
          :first="firstRecordIndex"
          :filters.sync="filters" 
          :scrollable="true" scrollHeight="flex"
          ref="dt"
          selectionMode="single" dataKey="vin"
          contextMenu :contextMenuSelection.sync="selectedPackage" 
           class="p-datatable-sm"
          >
          <!-- :selection.sync="selectedPackage"  -->
            <template #empty>
                No records found
            </template>
            <template #loading>
                Loading records, please wait...
            </template>
             <template #header>
                <div>
                   <div style="float: left">
                    Package List
                    </div>
                    <!-- <div style="text-align: right;">
                    <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                </div>    -->
                    <div style="float: right;">
                        <i class="pi pi-search" style="margin: 0px 0px 0px 0px;"></i>
                        <InputText v-model="filters['global']" 
                        placeholder="Global Search" size="50" />
                        
                        <Button icon="ti-plus" 
                        @click="onAddRecord()" 
                        class="pi pi-external-link" id="addModalVisible-button" 
                        data-toggle="modal"
                         style="margin: 0px 0px 0px 4px;">
                        </Button>
                        <!-- You can choose types of search input -->
                        
                        <modal :show.sync="addModalVisible"
                        id="addModalVisible"
                        :centered="false"
                        :show-close="true">
                            <form @submit.prevent="onSave">
                                <div slot="content">
                                    <div class="col-lg-12 col-md-12">
                                        <div class="card">
                                            <div class="header">
                                                <h4 class="title">Add Package
                                                    
                                                    <button type="button"
                                                            class="close"
                                                            v-if="showClose"
                                                            @click="closeModal"
                                                            data-dismiss="modal"
                                                            aria-label="Close"
                                                            style="font-size: 1rem; margin: 4px 4px 4px 4px;">
                                                        <i class="ti-close"></i>
                                                    </button>
                                                </h4>
                                            </div>
                                            <div class="content">
                                                    <div id="div_id_name" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group" :class="{invalid: $v.name.$error}"> 
                                                                <label for="id_name" class="requiredField">
                                                                    Package Name<span class="asteriskField">*</span> 
                                                                </label> 
                                                                <input 
                                                                type="text" 
                                                                name="name" 
                                                                placeholder="Package Name" 
                                                                class="form-control border-input" 
                                                                id="id_name"
                                                                v-model="name"
                                                                @blur="$v.name.$touch()"
                                                                > 
                                                                <label class="validationmessage" v-if="!$v.name.minLength">
                                                                 <span> Minimum length should be 10 </span>
                                                                </label> 
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div id="div_id_description" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group"> 
                                                            <label for="id_description" class="">  Description </label> 
                                                                <textarea 
                                                                name="description" 
                                                                cols="32" 
                                                                rows="5" 
                                                                placeholder="Description" 
                                                                class="textarea form-control border-input" 
                                                                id="id_description"
                                                                v-model="description"
                                                                ></textarea> 
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div id="div_id_packagesave" style="float: right;" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group"> 
                                                                <Button 
                                                                label="Save" 
                                                                style="margin: 0px 4px 0px 0px;" 
                                                                @click="onSave"
                                                                :disabled="$v.name.$invalid"
                                                                > </Button>  
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </form>
                        </modal>

                        <modal :show.sync="uploadFileModalVisible"
                        id="uploadFileModalVisible"
                        :centered="false"
                        :show-close="true">
                            <form enctype="multipart/form-data" @submit.prevent="onUploadPackage">
                                <div slot="content">
                                    <div class="col-lg-12 col-md-12">
                                        <div class="card">
                                            <div class="header">
                                                <h4 class="title">Upload Package
                                                    
                                                    <button type="button"
                                                            class="close"
                                                            v-if="showClose"
                                                            @click="closeModal"
                                                            data-dismiss="modal"
                                                            aria-label="Close"
                                                            style="font-size: 1rem; margin: 4px 4px 4px 4px;">
                                                        <i class="ti-close"></i>
                                                    </button>
                                                </h4>
                                            </div>
                                            <div class="content">
                                                    <div id="div_id_name" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group" > 
                                                                <label for="id_name" 
                                                                class="requiredField"> Name
                                                                </label> 
                                                                <input 
                                                                type="text" 
                                                                name="name" 
                                                                placeholder="File Name" 
                                                                class="form-control border-input" 
                                                                id="id_filename"
                                                                v-model="filename"
                                                                :disabled=true
                                                                > 
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div id="div_id_description" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group" > 
                                                            <label for="id_packageFile" class="requiredField"> PackageFile
                                                                <span class="asteriskField">*</span> 
                                                            </label> 
                                                            <br>
                                                            <label>Chage:</label>
                                                            <input 
                                                                type="file" 
                                                                name="packageFile" 
                                                                class="form-control-file" 
                                                                id="id_packageFile"
                                                                ref="packageFile"
                                                                :class="{ invalid: $v.packageFile.$error }" 
                                                                accept=".zip, .robot"
                                                                @change="handleFileUpload"
                                                            >
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div id="div_id_packagesave" style="float: left;" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group"> 
                                                                <Button 
                                                                    label="Save" 
                                                                    style="margin: 0px 4px 0px 0px;" 
                                                                    @click="onUploadPackage"
                                                                    :disabled=" $v.packageFile.$invalid"
                                                                    > </Button>   
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </form>
                        </modal>

                    </div>
                </div>
            </template>
            <Column field="name" header="Name" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.name}}
              </template>
            </Column>
            <Column field="description" header="Description" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.description ? slotProps.data.description : ""}}
              </template>
            </Column>
            <!-- <Column field="version" header="Version" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.version ? slotProps.data.version : ""}}
              </template>
            </Column> -->
            <Column field="packageFile" header="File" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.packageFile ? slotProps.data.packageFile : ""}}
              </template>
            </Column>
            <Column field="action" header="Action">
            <template #body="slotProps">
                <a 
                href="#"
                class="p-button-link"
                @click="onUploadFile(slotProps.data.id,slotProps.data.name)" 
                id="uploadFileModalVisible-button" 
                >UPLOAD</a>
                |
                <a 
                class="p-button-link"
                v-bind:href="slotProps.data.packageFile"
                >File</a>
            </template>
            </Column>
            <template #footer>
                In total there are {{packages ? packages.length : 0 }} Package.
            </template>
          </DataTable>
        </div>
      </div>
      <!-- </Dialog> -->
    </div>
</template>
<script>
import PackageService from '../script/service/packageService';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            packageid: 0,
            name: '',
            filename: '',
            description: '',
            version: '',
            packageFile: '',


            columns: null,
            packages: null,
            firstRecordIndex: 0,
            filters: {},
            dialogVisible: false,
            packageService: null,
            selectedPackage: null,
            addModalVisible: false,
            uploadFileModalVisible: false
        }
    },
    props: {
        showClose: {
        type: Boolean,
        default: true
        }
     },
     validations: {
         name: {
            required,
            minLength: minLength(10)
        },
        packageFile: {
            required
        }
     },
    created() {
      this.columns = [
            {field: 'name', header: 'Name'},
            {field: 'description', header: 'Description'},
            {field: 'version', header: 'version'},
            {field: 'packageFile', header: 'packageFile'},
        ];
        this.packageService = new PackageService();
    },
    mounted() {
        this.loading = true;
        this.packages =  this.packageService.getPackage();
        this.loading = false;
    },
    methods: {
        openDialog() {
        if(!this.dialogVisible){ this.dialogVisible = true; } else { this.dialogVisible = false; }
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        closeModal() {
        this.clearFormValues();
        this.addModalVisible  = false;
        this.uploadFileModalVisible  = false;
        },
       async onSave(){
            const formData = {
                id: this.id,
                name: this.name,
                description: this.description,
                version: this.version,
                packageFile: this.packageFile
                }
            await this.packageService.onSave(formData);
            this.packages =  await this.packageService.getPackage();
            this.closeModal();
        },
        clearFormValues(){
            this.id = 0;
            this.name = '';
            this.description = '';
            this.version = '';
            this.packageFile = '';
        },
        onAddRecord(){
            this.addModalVisible = true;
        },
        onUploadFile(packageId,fileName){
            this.$refs.packageFile.value = '';
            this.packageid = packageId;
            this.filename = fileName;
            this.uploadFileModalVisible = true;
        },
        async onUploadPackage(){
            let formData = new FormData();
                formData.append( 'id', this.packageid );
                formData.append( 'packageFile', this.packageFile );
            await this.packageService.onUploadPackageFile(formData);
            this.packages = await this.packageService.getPackage();
            this.closeModal();
        },
        handleFileUpload(){
            this.packageFile = this.$refs.packageFile.files[0];
        }
    }
}
</script>
<style>
  
</style>
