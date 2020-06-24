<template>
    <div class="row" style="height: calc(100vh - 143px)">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="openDialog" /> -->
<!-- <Dialog header="Flex Scroll" :visible.sync="dialogVisible" :style="{width: '50vw'}" :maximizable="true" :modal="true" :contentStyle="{height: '300px'}"> -->
      <div class="p-card">
        <div class="p-card-body" style="padding:0">
          <DataTable 
          :value="machines" 
          :paginator="true"
          :rows="5"
          :first="firstRecordIndex"
          sortMode="multiple"
          :multiSortMeta="multiSortMeta"
          :filters.sync="filters" 
          :scrollable="true" scrollHeight="flex"
          @row-reorder="onRowReorder"
          ref="dt"
          selectionMode="single" 
          dataKey="vin"
          contextMenu :contextMenuSelection.sync="selectedMachine" 
          @row-contextmenu="onRowContextMenu"
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
                  <div style="float: right">
                      <i class="pi pi-search" style="margin: 4px 4px 0px 0px;"></i>
                      <InputText v-model="filters['global']" placeholder="Global Search" size="50" />
                  </div>
                <div style="text-align: right">
                    <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                </div>
                </div>
            </template>
            <ContextMenu :model="menuModel" ref="cm" />
            <Column field="name" header="Name" :sortable="true" filterMatchMode="Starts with">
                <template #filter>
                    <InputText  style="width: 100px;" type="text" v-model="filters['name']" class="p-column-filter" placeholder="Name" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.name}}
              </template>
            </Column>
            <Column field="description" header="Description" :sortable="true" filterMatchMode="Contains">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['description']" class="p-column-filter" placeholder="Description" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.description}}
              </template>
            </Column>
            <Column field="machineKey" header="Machine Key" :sortable="true" filterMatchMode="in">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['machineKey']" class="p-column-filter" placeholder="MachineKey" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.machineKey}}
              </template>
            </Column>
            <Column field="lastAvailable" header="Last available" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['lastAvailable']" class="p-column-filter" placeholder="LastAvailable" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.lastAvailable}}
              </template>
            </Column>
            <Column field="status" header="Status" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['status']" class="p-column-filter" placeholder="Status" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.status.name}}
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
export default {
    data() {
        return {
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
            ]
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
        }
    }
}
</script>
<style>
  
</style>
