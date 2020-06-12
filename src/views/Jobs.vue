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
          :selection.sync="selectedJob" selectionMode="single" dataKey="vin"
          contextMenu :contextMenuSelection.sync="selectedJob" @row-contextmenu="onRowContextMenu"
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
                    List of Jobs
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
            <Column field="Process" header="Process" :sortable="true" filterMatchMode="Starts with">
                <template #filter>
                    <InputText  style="width: 100px;" type="text" v-model="filters['Process']" class="p-column-filter" placeholder="Process" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.Process}}
              </template>
            </Column>
            <Column field="Robot" header="Robot" :sortable="true" filterMatchMode="Contains">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['Robot']" class="p-column-filter" placeholder="Robot" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.Robot}}
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
            <Column field="State" header="State" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['State']" class="p-column-filter" placeholder="State" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.State}}
              </template>
            </Column>
            <Column field="Started" header="Started" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['Started']" class="p-column-filter" placeholder="Started" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.Started}}
              </template>
            </Column>
            <Column field="Ended" header="Ended" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['Ended']" class="p-column-filter" placeholder="Ended" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.Ended}}
              </template>
            </Column>
            <Column field="Source" header="Source" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['Source']" class="p-column-filter" placeholder="Source" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.Source}}
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
            {field: 'Process', header: 'Process'},
            {field: 'Robot', header: 'Robot'},
            {field: 'Enivronment', header: 'Enivronment'},
            {field: 'State', header: 'State'},
            {field: 'Started', header: 'Started'},
            {field: 'Ended', header: 'Ended'},
            {field: 'Source', header: 'Source'}
        ];
        this.jobService = new JobService();
    },
    mounted() {
        this.loading = true;
        this.jobs =  this.jobService.getJobs();
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
            this.$toast.add({severity: 'info', summary: 'Job Selected', detail: job.Process + ' - ' + job.Enivronment});
        },
        deleteJob(job) {
            this.jobs = this.jobs.filter((c) => c.vin !== job.vin);
            this.$toast.add({severity: 'info', summary: 'Job Deleted', detail: job.Process + ' - ' + job.Enivronment});
            this.selectedJob = null;
        }
    }
}
</script>
<style>
  
</style>
