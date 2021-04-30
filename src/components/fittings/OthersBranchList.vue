<template>
    <div>
        <v-row class="justify-center">
            <v-col cols="auto" class="justify-center">
                <v-list-item center >
                    <v-list-item-icon>
                        <v-icon>fab fa-old-republic </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ name }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="auto" v-if="showInfromation">
                <div v-for="(textField, i) in texts" :key="i">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item center dense class="mx-2" v-bind="attrs" v-on="on">
                                <v-list-item-icon>
                                    <v-icon> fas fa-info-circle </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ textField }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <span>{{ textField }}</span>
                    </v-tooltip>
                </div>
            </v-col>
            <v-col cols="auto">
                <div v-for="(linkField, i) in links" :key="i">
                    <v-list-item center dense class="mx-2">
                        <v-list-item-icon>
                            <v-btn icon v-bind:href="linkField" target="_blank">
                                <v-icon> fas fa-link </v-icon>
                            </v-btn>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                <a v-bind:href="linkField" target="_blank">{{ linkField }}</a>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
    name: 'OthersBranchList',
    props: ["otherBranch"],
    data () {
        return {
            elements:[],
            name:"",
            links:[],
            texts:[],
            showInfromation:true
        };
    },
    methods: {
        elementsArrayUpload()
        {
            this.elements.push(this.otherBranch.value1);
            this.elements.push(this.otherBranch.value2);
            this.elements.push(this.otherBranch.value3);
            this.elements.push(this.otherBranch.value4);
            this.elements.push(this.otherBranch.value5);
        },
        linkOrText()
        {
            var ind = 0;
            this.elements.forEach(element => {
                if (element != null)
                {
                    switch(element[0]) {
                        case 't':
                            if (ind == 0)
                            {
                                this.name = element.substring(2);
                                ind++;
                            }
                            else
                            {
                                this.texts.push(element.substring(2));
                            }
                            break;
                        case 'l':
                            this.links.push(element.substring(2));
                            break;
                    }
                    
                }
            });
            if(this.texts.length == 0)
            {
                this.showInfromation = false;
            }
        }
        
    },
    mounted()
    {
        this.elementsArrayUpload();
        this.linkOrText();
    }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>