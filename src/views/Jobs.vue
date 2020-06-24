<template>
    <div class="row" style="height: calc(100vh - 143px)">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="openDialog" /> -->
<!-- <Dialog header="Flex Scroll" :visible.sync="dialogVisible" :style="{width: '50vw'}" :maximizable="true" :modal="true" :contentStyle="{height: '300px'}"> -->
      <div class="p-card">
        <div class="p-card-body" style="padding:0">
          <DataTable 
          :value="jobs" 
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
          contextMenu :contextMenuSelection.sync="
          selectedJob" @row-contextmenu="onRowContextMenu"
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
            <Column field="machine" header="Machine" :sortable="true" filterMatchMode="Contains">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['machine']" class="p-column-filter" placeholder="Machine" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.machine.name}}
              </template>
            </Column>
            <Column field="package" header="Package" :sortable="true" filterMatchMode="in">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['package']" class="p-column-filter" placeholder="Package" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.package.name}}
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
                  {{  slotProps.data.status.name }}
              </template>
            </Column>
            <Column field="startedOn" header="Last Run" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['startedOn']" class="p-column-filter" placeholder="Last Run" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{  slotProps.data.status.startedOn }}
              </template>
            </Column>
            <Column field="action" header="Action" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['action']" class="p-column-filter" placeholder="Action" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
            <template #body="slotProps">
                <Button type="button" label="RUN" icon="pi pi-pencil" aria-placeholder="Link" class="p-button-warning">{{slotProps.data.action}}</Button>
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
export default {
    data() {
        return {
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
            ]
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
        }
    }
}
</script>
<style>
  
</style>
