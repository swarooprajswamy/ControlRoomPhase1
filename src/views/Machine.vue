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
          :multiSortMeta="multiSortMeta"
          :filters.sync="filters" 
          :scrollable="true" scrollHeight="flex"
          @row-reorder="onRowReorder"
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
                                                <h4 class="title">Edit Machine
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
                                                                id="id_description"></textarea> 
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
                                                                    id="id_machineKey"> 
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
            <ContextMenu :model="menuModel" ref="cm" />
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



            columns: null,
            machines: null,
            firstRecordIndex: 0,
            multiSortMeta: [
            // {field: 'year', order: 1},
            // {field: 'brand', order: -1},
            // {field: 'color', order: 1}
            ],
            filters: {},
            dialogVisible: false,
            machineService: null,
            selectedMachine: null,
            menuModel: [
                {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewMachine(this.selectedMachine)},
                {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteMachine(this.selectedMachine)}
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
        this.machines =  this.machineService.getMachine().data;
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
            this.machines = event.value;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        
        onRowContextMenu(event) {
            this.$refs.cm.show(event.originalEvent);
        },
        viewMachine(machine) {
            this.$toast.add({severity: 'info', summary: 'Machine Selected', detail: machine.Process + ' - ' + machine.Enivronment});
        },
        deleteMachine(machine) {
            this.machines = this.machines.filter((c) => c.vin !== machine.vin);
            this.$toast.add({severity: 'info', summary: 'Machine Deleted', detail: machine.Process + ' - ' + machine.Enivronment});
            this.selectedMachine = null;
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
