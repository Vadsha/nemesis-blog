<template>
    <div class="h-screen bg-white">
        <nav class="sticky top-0 flex justify-between w-screen px-4 py-1 text-white bg-dark-blue">
            <h1 class="text-2xl">
                <router-link :to="{name : 'HomeView'}">Nemesis</router-link>
            </h1>
            <ul class="flex my-auto">
                <li v-for="item in navItems" :key="item.name">
                    <router-link active-class="border-b" class="px-1 py-2 mx-3 hover:border-b border-makeup-2" :to="{name : item.path}">{{ item.name }}</router-link>
                </li>
            </ul>
            <button @click="signOut" class="px-4 py-1 border border-makeup-2 hover:bg-makeup-2">
                sign out
            </button>
        </nav>


        <router-view></router-view>

    </div>
</template>

<script>
import { auth } from '@/firebase'
    export default {
        data(){
            return {
                navItems : [
                    {
                        name : 'Home',
                        path : 'HomeView',
                    },
                    {
                        name : 'Tags',
                        path : 'AdminTagsView'
                    },
                    {
                        name : 'Blogs',
                        path : 'AdminBlogsView'
                    },
                    {
                        name : 'Resources',
                        path : 'AdminResourcesView'
                    },
                    {
                        name : 'FAQ',
                        path : 'AdminFaqView'
                    },
                    {
                        name : 'Contacts',
                        path : 'HomeView'
                    }
                ],
            }
        },
        methods : {
            signOut() {
                auth.signOut().then(() => {
                    this.$router.push({name : 'HomeView'})
                }).catch((err) => {
                    alert(err.message);
                })
            }
        }
    }
</script>

<style scoped>

</style>