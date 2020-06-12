<template>
    <div class="row" style="height: calc(100vh - 143px)">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="openDialog" /> -->
<!-- <Dialog header="Flex Scroll" :visible.sync="dialogVisible" :style="{width: '50vw'}" :maximizable="true" :modal="true" :contentStyle="{height: '300px'}"> -->
      <div class="p-card">
        <div class="p-card-body" style="padding:0">
          <DataTable 
          :value="schedules" 
          :paginator="true"
          :rows="5"
          :first="firstRecordIndex"
          sortMode="multiple"
          :multiSortMeta="multiSortMeta"
          :filters.sync="filters" 
          :scrollable="true" scrollHeight="flex"
          @row-reorder="onRowReorder"
          ref="dt"
          :selection.sync="selectedSchedule" selectionMode="single" dataKey="vin"
          contextMenu :contextMenuSelection.sync="selectedSchedule" @row-contextmenu="onRowContextMenu"
           class="p-datatable-sm"
          >
            <template #empty>
                No records found
            </template>
            <template #loading>
                Loading records, please wait...
            </template>
             <template #header>
                <div>
                   <div style="float: left">
                    <Button icon="pi pi-refresh"/>
                    List of Schedules
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
            <Column field="Name" header="Name" :sortable="true" filterMatchMode="Starts with">
                <template #filter>
                    <InputText  style="width: 100px;" type="text" v-model="filters['Name']" class="p-column-filter" placeholder="Name" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.Name}}
              </template>
            </Column>
            <Column field="Enivronment" header="Enivronment" :sortable="true" filterMatchMode="in">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['Enivronment']" class="p-column-filter" placeholder="Enivronment" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.Enivronment}}
              </template>
            </Column>
            <Column field="NextRunTime" header="NextRunTime" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['NextRunTime']" class="p-column-filter" placeholder="NextRunTime" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.NextRunTime}}
              </template>
            </Column>
            <Column field="Process" header="Process" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['Process']" class="p-column-filter" placeholder="Process" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.Process}}
              </template>
            </Column>
            <Column field="StopAfter" header="StopAfter" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['StopAfter']" class="p-column-filter" placeholder="StopAfter" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.StopAfter}}
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
export default {
    data() {
        return {
            columns: null,
            schedules: null,
            firstRecordIndex: 0,
            multiSortMeta: [
            // {field: 'year', order: 1},
            // {field: 'brand', order: -1},
            // {field: 'color', order: 1}
            ],
            filters: {},
            dialogVisible: false,
            scheduleService: null,
            selectedSchedule: null,
            menuModel: [
                {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewSchedule(this.selectedSchedule)},
                {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteSchedule(this.selectedSchedule)}
            ]
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
            this.schedules = event.value;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        
        onRowContextMenu(event) {
            this.$refs.cm.show(event.originalEvent);
        },
        viewSchedule(schedule) {
            this.$toast.add({severity: 'info', summary: 'Schedule Selected', detail: schedule.Process + ' - ' + schedule.Enivronment});
        },
        deleteSchedule(schedule) {
            this.schedules = this.schedules.filter((c) => c.vin !== schedule.vin);
            this.$toast.add({severity: 'info', summary: 'Schedule Deleted', detail: schedule.Process + ' - ' + schedule.Enivronment});
            this.selectedSchedule = null;
        }
    }
}
</script>
<style>
</style>
