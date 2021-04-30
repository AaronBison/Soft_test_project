<template>
    <v-card id="card">
        <v-card-title> Egyetemi részleghez egyebek hozzáadása </v-card-title>
        <v-divider class="mx-5 my-3"></v-divider>
        <v-radio-group class="mx-5 " v-model="selectResult" row>
            <v-radio label="Hozzáadás" value="add"></v-radio>
            <v-radio label="Szerkesztés" value="update"></v-radio>
        </v-radio-group>
        <InfOthersAdd v-if="this.selectResult == 'add' "/>
    </v-card>
</template>

<script>

import InfOthersAdd from "./infOthersAdd";

export default {
    name: 'InformationOthersAddUpdate',
    components:{InfOthersAdd},
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