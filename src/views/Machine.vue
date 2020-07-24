<template>
    <div class="row" style="height: calc(100vh - 143px)">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="openDialog" /> -->
        <!-- <Dialog header="Flex Scroll" :visible.sync="dialogVisible" :style="{width: '50vw'}" :maximizable="true" :modal="true" :contentStyle="{height: '300px'}"> -->
      <div class="p-card">
        <div class="p-card-body" style="padding:0">
          <DataTable 
          :value="machines" 
          :paginator="true"
          :rows="10"
          :first="firstRecordIndex"
          :filters.sync="filters" 
          :scrollable="true" scrollHeight="flex"
          ref="dt"
          selectionMode="single" 
          dataKey="vin"
          contextMenu :contextMenuSelection.sync="selectedMachine" 
           class="p-datatable-sm"
          >
          <!-- :selection.sync="selectedMachine"  -->
            <template #empty>
                No records found
            </template>
            <template #loading>
                Loading records, please wait...
            </template>
             <template #header>
                <div>
                   <div style="float: left">
                    Machine List
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
                                                <h4 class="title">Add Machine
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
                                                            <div class="form-group" :class="{invalid: $v.name.$error}" > 
                                                                <label for="id_name" 
                                                                class="requiredField"> Machine Name
                                                                <span class="asteriskField">*</span> 
                                                                </label> 
                                                                <input 
                                                                type="text" 
                                                                name="name" 
                                                                placeholder="Machine Name" 
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
                                                    <div id="div_id_machineKey" class="row"> 
                                                        <div class="col-md-12">
                                                            <div class="form-group"> 
                                                                <label for="id_machineKey" class=" requiredField">
                                                                Machinekey<span class="asteriskField">*</span> </label> 
                                                                    <input 
                                                                    type="text" 
                                                                    name="machineKey" 
                                                                    readonly="True" 
                                                                    value="Will generate automatically" 
                                                                    class="textinput textInput form-control" 
                                                                    id="id_machineKey"
                                                                    v-model="machineKey"
                                                                    > 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="div_id_machinesave" style="float: right;" class="row"> 
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
            <Column field="description" header="Description" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.description ? slotProps.data.description : ""}}
              </template>
            </Column>
            <Column field="machineKey" header="Machine Key" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.machineKey ? slotProps.data.machineKey : ""}}
              </template>
            </Column>
            <Column field="lastAvailable" header="Last available" :sortable="true">
              <template #body="slotProps">
                  {{slotProps.data.lastAvailable ? slotProps.data.lastAvailable : ""}}
              </template>
            </Column>
            <Column field="status" header="Status" :sortable="true">
              <template #body="slotProps">
                  {{ slotProps.data.status ? slotProps.data.status.name : ""}}
              </template>
            </Column>
            <template #footer>
                In total there are {{machines ? machines.length : 0 }} Machine.
            </template>
          </DataTable>
        </div>
      </div>
      <!-- </Dialog> -->
    </div>
</template>
<script>
import MachineService from '../script/service/machineService';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            name: '',
            description: '',
            machineKey: '',
            lastAvailable: '',
            status: '',

            columns: null,
            machines: null,
            firstRecordIndex: 0,
            filters: {},
            dialogVisible: false,
            machineService: null,
            selectedMachine: null,
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
            {field: 'name', header: 'Name'},
            {field: 'description', header: 'Description'},
            {field: 'machineKey', header: 'MachineKey'},
            {field: 'lastAvailable', header: 'LastAvailable'},
            {field: 'status', header: 'Status'},
        ];
        this.machineService = new MachineService();
    },
    mounted() {
        this.loading = true;
        this.machines =  this.machineService.getMachine();
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
                id: this.id,
                name: this.name,
                description: this.description,
                machineKey: this.machineService.getGUID(),
                lastAvailable: this.lastAvailable,
                status: this.status
                }
            this.machineService.onSave(formData);
            this.machines =  this.machineService.getMachine();
            this.id = 0;
            this.name = '';
            this.description = '';
            this.machineKey = '';
            this.lastAvailable = '';
            this.status = '';
            this.closeModal();
        }
    }
}
</script>
<style>
  
</style>
