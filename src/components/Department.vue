<template>
    <v-layout wrap class="justify-center" >
        <DepartmentCard v-for="card in departments" :key="card.departmentName" :card="card"/>
    </v-layout>
</template>

<script>
import GeneralTasks from "@/services/generalTasks"
import DepartmentCard from "./fittings/DepartmentCard"
export default {
    name: 'Department',
    components: {DepartmentCard},
    data () {
        return {
            departments: null,
        };
    },
    methods: {
        getDepartment()
        {
            GeneralTasks.getDepartments().then((res)=>{
                this.departments = res.data;
            }).catch((err)=>{
                this.departments = null;
            })
        }
    },
    mounted()
    {
        this.getDepartment();
    }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>