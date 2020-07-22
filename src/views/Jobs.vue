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
          :multiSortMeta="multiSortMeta"
          :filters.sync="filters" 
          :scrollable="true" 
          scrollHeight="flex"
          @row-reorder="onRowReorder"
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
                                                <h4 class="title">Edit Jobs
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
                                                            class="requiredField"> Jobs Name
                                                            <span class="asteriskField">*</span> 
                                                            </label> 
                                                            <input 
                                                            type="text" 
                                                            name="name" 
                                                            placeholder="Job Name" 
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
                                                <div id="div_id_machine" class="row"> 
                                                    <div class="col-md-12">
                                                        <div class="form-group"> 
                                                            <label for="id_machine" class=""> Machine </label> 
                                                            <input 
                                                                type="text" 
                                                                name="name" 
                                                                placeholder="Machine Name" 
                                                                class="form-control border-input" 
                                                                required="" id="id_name"> 
                                                        </div>
                                                    </div>
                                                    </div> 
                                                    <div id="div_id_package" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group"> 
                                                                <label for="id_package" class=""> Package </label> 
                                                                <input 
                                                                type="text" 
                                                                name="name" 
                                                                placeholder="Package Name" 
                                                                class="form-control border-input" 
                                                                required="" id="id_name"> 
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
            <ContextMenu :model="menuModel" ref="cm" />
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
                  {{  slotProps.data.status ? slotProps.data.status.startedOn : "" }}
              </template>
            </Column>
            <Column field="action" header="Action" :sortable="true">
            <template #body="slotProps">
                <Button 
                type="button" 
                label="RUN" 
                aria-placeholder="Link" 
                class="p-button-link">{{slotProps.data.action}}</Button>
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
            name: '',




            columns: null,
            jobs: null,
            firstRecordIndex: 0,
            multiSortMeta: [
            // {field: 'year', order: 1},
            // {field: 'brand', order: -1},
            // {field: 'color', order: 1}
            ],
            filters: {},
            dialogVisible: false,
            jobService: null,
            selectedJob: null,
            menuModel: [
                {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewJob(this.selectedJob)},
                {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteJob(this.selectedJob)}
            ],
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
        this.jobs =  this.jobService.getJobs().data;
        this.loading = false;
    },
    methods: {
      myOwnEquals(value, filter) {
          if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
              return true;
          }

          if (value === undefined || value === null) {
              return false;
          }

          return value.toString().toLowerCase() === filter.toString().toLowerCase();
      },
      openDialog() {
        if(!this.dialogVisible){ this.dialogVisible = true; } else { this.dialogVisible = false; }
      },
      onRowReorder(event) {
            //update new order
            this.jobs = event.value;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        
        onRowContextMenu(event) {
            this.$refs.cm.show(event.originalEvent);
        },
        viewJob(job) {
            this.$toast.add({severity: 'info', summary: 'Job Selected', detail: job.name + ' - ' + job.machine});
        },
        deleteJob(job) {
            this.jobs = this.jobs.filter((c) => c.vin !== job.vin);
            this.$toast.add({severity: 'info', summary: 'Job Deleted', detail: job.name + ' - ' + job.machine});
            this.selectedJob = null;
        },
        closeModal() {
        this.addModalVisible  = false;
        },
        onSave(){
            console.log('Completed');
        }
    }
}
</script>
<style>
  
</style>
