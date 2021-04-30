<template>
    <v-card id="card">
        <v-card-title> Egyetemi részleg megadása, szerkesztése </v-card-title>
        <v-divider class="mx-5 my-3"></v-divider>
        <v-radio-group class="mx-5 " v-model="selectResult" row>
            <v-radio label="Hozzáadás" value="add"></v-radio>
            <v-radio label="Szerkesztés" value="update"></v-radio>
        </v-radio-group>
        <InfDepAdd v-if="this.selectResult == 'add' "/>
        <InfDepUpd v-if="this.selectResult == 'update' "/>
    </v-card>
</template>

<script>

import InfDepAdd from "./InfDepAdd.vue";
import InfDepUpd from "./InfDepUpd.vue";

export default {
    name: 'InformationDepartmentAddUpdate',
    components:{InfDepAdd,InfDepUpd},
    data () {
        return {
            selectResult: "add",
        };
    },
    methods:{
        
    },
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>