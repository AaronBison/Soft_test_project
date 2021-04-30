<template>
    <v-card id="card">
        <v-card-title> Szak megadása </v-card-title>
        <v-divider class="mx-5 my-3"></v-divider>
        <v-radio-group class="mx-5 " v-model="selectResult" row>
            <v-radio label="Hozzáadás" value="add"></v-radio>
            <v-radio label="Szerkesztés" value="update"></v-radio>
        </v-radio-group>
        <InfBranchAdd v-if="this.selectResult == 'add' "/>
        <InfBranchUpd v-if="this.selectResult == 'update' "/>
    </v-card>
</template>

<script>

import InfBranchAdd from "./infBranchAdd.vue";
import InfBranchUpd from "./infBranchUpd.vue";

export default {
    name: 'InformationBranchAddUpdate',
    components:{InfBranchAdd, InfBranchUpd},
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