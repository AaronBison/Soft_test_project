<template>
    <div>
        <v-row class="justify-center">
            <v-col cols="auto" class="justify-center">
                <v-list-item center>
                    <v-list-item-icon>
                        <v-btn icon v-bind:href="branch.link" target="_blank">
                            <v-icon>fab fa-old-republic </v-icon>
                        </v-btn>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <a v-bind:href="branch.link" target="_blank">{{ branch.branchName }}</a>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
        <v-row class="justify-center">
                <v-col cols="auto" class="justify-center">
                    <v-list-item center dense class="mx-2">
                        <v-list-item-icon>
                            <v-icon> fas fa-universal-access </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ branch.coordinatorName }} szakkoordinátor
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
                <v-col cols="auto" class="justify-center">
                    <v-list-item center dense class="mx-2">
                        <v-list-item-icon>
                            <v-icon> fas fa-mail-bulk </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title> 
                                {{ branch.coordinatorEmail }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
                <v-col cols="auto" class="justify-center">
                    <v-list-item center dense class="mx-2">
                        <v-list-item-icon>
                            <v-btn icon href="https://www.google.com/maps/?hl=HU">
                                <v-icon>fas fa-map-marked-alt</v-icon>
                            </v-btn>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title> {{ branch.roomNumber }} terem</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
    name: 'BranchesList',
    props: ["branch"],
    data () {
        return {
        };
    }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>