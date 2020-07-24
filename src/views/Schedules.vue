<template>
    <div class="row" style="height: calc(100vh - 143px)">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="openDialog" /> -->
<!-- <Dialog header="Flex Scroll" :visible.sync="dialogVisible" :style="{width: '50vw'}" :maximizable="true" :modal="true" :contentStyle="{height: '300px'}"> -->
      <div class="p-card">
        <div class="p-card-body" style="padding:0">
          <DataTable 
          :value="schedules" 
          :paginator="true"
          :rows="10"
          :first="firstRecordIndex"
          :filters.sync="filters" 
          :scrollable="true" 
          scrollHeight="flex"
          ref="dt"
           selectionMode="single" dataKey="vin"
          contextMenu :contextMenuSelection.sync="selectedSchedule" 
           class="p-datatable-sm"
          >
          <!-- :selection.sync="selectedSchedule" -->
            <template #empty>
                No records found
            </template>
            <template #loading>
                Loading records, please wait...
            </template>
             <template #header>
                <div>
                   <div style="float: left">
                    List of Schedules
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
                                                <h4 class="title">Add Schedule
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
                                                                <label for="id_name" class=" requiredField"> Schedule Name
                                                                    <span class="asteriskField">*</span> </label> 
                                                                <input 
                                                                type="text" 
                                                                name="name" 
                                                                placeholder="Schedule Name" 
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
                                                    <div id="div_id_enivronment" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group"> 
                                                            <label for="id_enivronment" class=""> Enivronment </label> 
                                                                <input 
                                                                type="text" 
                                                                name="name" 
                                                                placeholder="Schedule Enivronment" 
                                                                class="form-control border-input" 
                                                                id="id_enivronment"
                                                                v-model="enivronment"
                                                                > 
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div id="div_id_schedulesave" style="float: right;" class="row"> 
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
            <Column field="Name" header="Name" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.Name}}
              </template>
            </Column>
            <Column field="Enivronment" header="Enivronment" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.Enivronment ? slotProps.data.Enivronment : ""}}
              </template>
            </Column>
            <Column field="NextRunTime" header="NextRunTime" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.NextRunTime ? slotProps.data.NextRunTime : ""}}
              </template>
            </Column>
            <Column field="Process" header="Process" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.Process ? slotProps.data.Process : ""}}
              </template>
            </Column>
            <Column field="StopAfter" header="StopAfter" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.StopAfter ? slotProps.data.StopAfter : ""}}
              </template>
            </Column>
            <template #footer>
                In total there are {{schedules ? schedules.length : 0 }} schedules.
            </template>
          </DataTable>
        </div>
      </div>
      <!-- </Dialog> -->
    </div>
</template>
<script>
import ScheduleService from '../script/service/schedulesService';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            name: '',
            enivronment: '',
            nextRunTime: '',
            process: '',
            stopAfter: '',

            columns: null,
            schedules: null,
            firstRecordIndex: 0,
            filters: {},
            dialogVisible: false,
            scheduleService: null,
            selectedSchedule: null,
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
         name:{
             required,
             minLength: minLength(10)
         }
     },
    created() {
      this.columns = [
            {field: 'Name', header: 'Name'},
            {field: 'Enivronment', header: 'Enivronment'},
            {field: 'NextRunTime', header: 'NextRunTime'},
            {field: 'Process', header: 'Process'},
            {field: 'StopAfter', header: 'StopAfter'}
        ];
        this.scheduleService = new ScheduleService();
    },
    mounted() {
        this.loading = true;
        this.schedules =  this.scheduleService.getSchedules();
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
                name: this.name,
                enivronment: this.enivronment,
                nextRunTime: this.nextRunTime,
                process: this.process,
                stopAfter: this.stopAfter
                }
            this.scheduleService.onSave(formData);
            this.closeModal();
        }
    }
}
</script>
<style>
</style>
