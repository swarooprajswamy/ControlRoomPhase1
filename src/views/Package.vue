<template>
    <div class="row" style="height: calc(100vh - 143px)">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="openDialog" /> -->
<!-- <Dialog header="Flex Scroll" :visible.sync="dialogVisible" :style="{width: '50vw'}" :maximizable="true" :modal="true" :contentStyle="{height: '300px'}"> -->
      <div class="p-card">
        <div class="p-card-body" style="padding:0">
          <DataTable 
          :value="packages" 
          :paginator="true"
          :rows="5"
          :first="firstRecordIndex"
          sortMode="multiple"
          :multiSortMeta="multiSortMeta"
          :filters.sync="filters" 
          :scrollable="true" scrollHeight="flex"
          @row-reorder="onRowReorder"
          ref="dt"
          selectionMode="single" dataKey="vin"
          contextMenu :contextMenuSelection.sync="selectedPackage" 
          @row-contextmenu="onRowContextMenu"
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
            <Column field="version" header="Version" :sortable="true" filterMatchMode="in">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['version']" class="p-column-filter" placeholder="Version" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.version}}
              </template>
            </Column>
            <Column field="packageFile" header="File" :sortable="true" filterMatchMode="myOwnEquals">
                <template #filter>
                    <InputText  style="width: 100px;"  type="text" v-model="filters['packageFile']" class="p-column-filter" placeholder="File" />
                </template>
                <template #loading>
                  <span class="loading-text"></span>
              </template>
              <template #body="slotProps">
                  {{slotProps.data.packageFile}}
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
export default {
    data() {
        return {
            columns: null,
            packages: null,
            firstRecordIndex: 0,
            multiSortMeta: [
            // {field: 'year', order: 1},
            // {field: 'brand', order: -1},
            // {field: 'color', order: 1}
            ],
            filters: {},
            dialogVisible: false,
            packageService: null,
            selectedPackage: null,
            menuModel: [
                {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewPackage(this.selectedPackage)},
                {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deletePackage(this.selectedPackage)}
            ]
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
        this.packages =  this.packageService.getPackage().data;
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
            this.packages = event.value;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        
        onRowContextMenu(event) {
            this.$refs.cm.show(event.originalEvent);
        },
        viewPackage(obj) {
            this.$toast.add({severity: 'info', summary: 'Package Selected', detail: obj.name + ' - ' + obj.version});
        },
        deletePackage(obj) {
            this.packages = this.packages.filter((c) => c.vin !== obj.vin);
            this.$toast.add({severity: 'info', summary: 'Package Deleted', detail: obj.name + ' - ' + obj.version});
            this.selectedPackage = null;
        }
    }
}
</script>
<style>
  
</style>
