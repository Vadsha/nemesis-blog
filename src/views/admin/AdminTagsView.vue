<template>
    <div class="flex flex-wrap justify-around p-8 bg-white text-gray-1">
        <h1 class="w-full mb-8 text-3xl text-center">TAGS</h1>
        <table class="h-fit" v-if="tags.length">
            <tr class="text-white bg-dark-blue">
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            <tr class="px-8 my-1" v-for="tag in tags" :key="tag.id">
                <td>{{ tag.id }}</td>
                <td>{{ tag.name }}</td>
                <td class="text-makeup-2">
                    <button @click="deleteTag(tag.id)">delete</button>
                </td>
            </tr>
        </table>
        <div v-else class="text-2xl">
            Loading . . .
        </div>

        <form @submit.prevent="createTag" class="p-8 shadow-lg sm:w-1/3 h-fit">
            <h1 class="mb-6 text-xl text-center">Create Tag</h1>
            <div>
                <label for="name">Name</label>
                <input v-model="formData.name" type="text" placeholder=" . . . . . ." class="w-full p-1 mt-1 bg-transparent border outline-none border-gray-1">
            </div>
            <button class="w-full py-1.5 mt-3 text-white bg-makeup-1">create</button>
        </form>

    </div>
</template>

<script>
import { db } from '@/firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
    export default {
        data() {
            return {
                formData : {
                    name : ''
                },
                tags : []
            }
        },
        mounted () {
            getDocs(query(collection(db , 'tags'))).then((res) => {
                res.forEach((doc) => {
                    let docObj = doc.data();
                    docObj.id = doc.id;
                    this.tags.push(docObj)
                })
            }).catch((err) => {
                alert(err.message)
            })
        },
        methods : {
            createTag(){
                addDoc(collection(db , 'tags') , this.formData).then(() => {
                    window.location.reload()
                }).catch((err) => {
                    alert(err.message)
                })
            },
            deleteTag(id){
                deleteDoc(doc(db , 'tags' , id)).then(() => {
                    window.location.reload()
                }).catch((err) => {
                    alert(err.message)
                })
            }
        }
    }
</script>

<style scoped>
th , td {
    padding: 0.8rem 4rem;
    border-bottom: 1px solid gray;
}
</style>