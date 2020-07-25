<template>
    <div class="row" style="height: calc(100vh - 143px)">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="openDialog" /> -->
        <!-- <Dialog header="Flex Scroll" :visible.sync="dialogVisible" :style="{width: '50vw'}" :maximizable="true" :modal="true" :contentStyle="{height: '300px'}"> -->
      <div class="p-card">
        <div class="p-card-body" style="padding:0">
          <DataTable 
          :value="jobs" 
          :paginator="true"
          :rows="10"
          :first="firstRecordIndex"
          :filters.sync="filters" 
          :scrollable="true" 
          scrollHeight="flex"
          ref="dt"
          selectionMode="single" 
          dataKey="vin"
          contextMenu :contextMenuSelection.sync="selectedJob" 
           class="p-datatable-sm"
          >
          <!-- :selection.sync="selectedJob"  -->
            <template #empty>
                No records found
            </template>
            <template #loading>
                Loading records, please wait...
            </template>
             <template #header>
                <div>
                   <div style="float: left">
                    Jobs List
                    </div>
                <!-- <div style="text-align: right;">
                    <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                </div>    -->
                    <div style="float: right;">
                        <i class="pi pi-search" style="margin: 0px 0px 0px 0px;"></i>
                        <InputText v-model="filters['global']" 
                        placeholder="Global Search" size="50" />
                        
                        <Button icon="ti-plus" 
                        @click="addModalVisible = true" 
                        class="pi pi-external-link" id="addModalVisible-button" 
                        data-toggle="modal"
                         style="margin: 0px 0px 0px 4px;">
                        </Button>
                        <!-- You can choose types of search input -->
                        
                        <modal :show.sync="addModalVisible"
                        class="modal-search"
                        id="addModalVisible"
                        :centered="false"
                        :show-close="true">
                            <form @submit.prevent="onSave">
                                <div slot="content">
                                    <div class="col-lg-12 col-md-12">
                                        <div class="card">
                                            <div class="header">
                                                <h4 class="title">Add Job
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
                                                        <!-- {{$v.name}} -->
                                                        <div class="form-group" :class="{invalid: $v.name.$error}"> 
                                                            <label for="id_name" 
                                                            class="requiredField"> Job Name
                                                            <span class="asteriskField">*</span> 
                                                            </label> 
                                                            <input 
                                                            type="text" 
                                                            name="name" 
                                                            placeholder="Job Name" 
                                                            class="form-control border-input" 
                                                            id="id_jobname"
                                                            v-model="name"
                                                            @blur="$v.name.$touch()"
                                                            > 
                                                            <label class="validationmessage" v-if="!$v.name.minLength">
                                                                 <span> Minimum length should be 10 </span>
                                                            </label> 
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div id="div_id_machine" class="row"> 
                                                    <div class="col-md-12">
                                                        <div class="form-group"> 
                                                            <label for="id_machine" class=""> Machine </label> 
                                                            <!-- <input 
                                                                type="text" 
                                                                name="name" 
                                                                placeholder="Machine Name" 
                                                                class="form-control border-input" 
                                                                id="id_machinename"
                                                                v-model="machine_id"
                                                                >  -->
                                                                <select type="text" 
                                                                name="name" 
                                                                placeholder="Package Name" 
                                                                class="form-control border-input" 
                                                                id="id_name"
                                                                v-model="machine_id"
                                                                >
                                                                    <option slot="options"
                                                                    v-for="machin in machineList" 
                                                                    v-bind:key="machin.id"
                                                                    v-bind:value="machin.id"
                                                                    class="dropdown-item">
                                                                        {{ machin.name }}
                                                                    </option>
                                                                </select>
                                                        </div>
                                                    </div>
                                                    </div> 
                                                    <div id="div_id_package" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group"> 
                                                                <label for="id_package" class=""> Package </label> 
                                                                <!-- <input 
                                                                type="text" 
                                                                name="name" 
                                                                placeholder="Package Name" 
                                                                class="form-control border-input" 
                                                                id="id_name"
                                                                v-model="package_id"
                                                                >  -->
                                                                
                                                                <select type="text" 
                                                                name="name" 
                                                                placeholder="Package Name" 
                                                                class="form-control border-input" 
                                                                id="id_name"
                                                                v-model="package_id"
                                                                >
                                                                    <option slot="options"
                                                                    v-for="packageq in packageList" 
                                                                    v-bind:key="packageq.id"
                                                                    v-bind:value="packageq.id"
                                                                    class="dropdown-item">
                                                                        {{ packageq.name }}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div id="div_id_jobsave" style="float: right;" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group"> 
                                                                <Button 
                                                                label="Save" 
                                                                style="margin: 0px 4px 0px 0px;" 
                                                                @click="onSave"
                                                                :disabled="$v.$invalid"
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
            <Column field="machine" header="Machine" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.machine ? slotProps.data.machine.name : ""}}
              </template>
            </Column>
            <Column field="package" header="Package" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.package ? slotProps.data.package.name : ""}}
              </template>
            </Column>
            <Column field="status" header="Status" :sortable="true">
              <template #body="slotProps">
                  {{ slotProps.data.status ? slotProps.data.status.name : ""}}
              </template>
            </Column>
            <Column field="startedOn" header="Last Run" :sortable="true">
              <template #body="slotProps">
                  {{  slotProps.data.startedOn }}
              </template>
            </Column>
            <Column field="action" header="Action">
            <template #body="slotProps">
                <a 
                href="#"
                class="p-button-link"
                @click="onRunJob(botcontrolURL+slotProps.data.id+'/start')"
                >RUN</a>
            </template>
            </Column>
            <template #footer>
                In total there are {{jobs ? jobs.length : 0 }} jobs.
            </template>
          </DataTable>
        </div>
      </div>
      <!-- </Dialog> -->
    </div>
</template>
<script>
import JobService from '../script/service/jobService';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            id: 0,
            name: '',
            machine_id: 0,
            package_id: 0,
            status: '',
            startedOn: '',
            botcontrolURL: 'https://rf-controlroom.azurewebsites.net/job/',

            machineList: null,
            packageList: null,

            columns: null,
            jobs: null,
            firstRecordIndex: 0,
            filters: {},
            dialogVisible: false,
            jobService: null,
            selectedJob: null,
            addModalVisible: false
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
        }
     },
    created() {
      this.columns = [
            {field: 'id', type: Int32Array, header: 'Id'},
            {field: 'name', type: String, header: 'Name'},
            {field: 'machine', type: String, header: 'Machine'},
            {field: 'package', type: String, header: 'Package'},
            {field: 'status', type: String, header: 'Status'},
            {field: 'startedOn', type: Date, header: 'Last Run'}
        ];
        this.jobService = new JobService();
    },
    mounted() {
        this.loading = true;
        this.jobs =  this.jobService.getJobs();
        this.machineList = this.jobService.getMachine();
        this.packageList = this.jobService.getPackage();
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
        this.addModalVisible  = false;
        },
        onSave(){
            const formData = {
                // id: this.id,
                name: this.name,
                machine_id: parseInt(this.machine_id),
                package_id: parseInt(this.package_id),
                // status: this.status,
                // startedOn: this.startedOn
                }
            this.jobService.onSave(formData);
            this.name= '',
            this.machine_id= 0,
            this.package_id= 0,
            this.status= '',
            this.startedOn= '',
            this.jobs =  this.jobService.getJobs();
            this.closeModal();
        },
        onRunJob(url) {
            this.jobService.onRunJob(url);
        }
    }
}
</script>
<style>
  
</style>
