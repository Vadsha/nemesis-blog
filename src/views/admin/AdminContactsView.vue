<template>
    <div>
        <table class="w-4/5 mx-auto mt-8 text-gray-1">
            <tr class="text-white bg-dark-blue">
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Actions</th>
            </tr>
            <tr class="px-8 my-1" v-for="contact in contacts" :key="contact.id">
                <td>{{ contact.name }}</td>
                <td>{{ contact.email }}</td>
                <td>{{ contact.message }}</td>
                <td class="text-center">
                    <button @click="deleteContact(contact.id)" class="text-makeup-2"><span class="material-icons-sharp">delete</span></button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { collection, getDocs, query , deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
    export default {
        data(){
            return {
                contacts : []
            }
        },
        methods : {
            deleteContact(id){
                deleteDoc(doc(db , 'contacts' , id)).then(() => {
                    window.location.reload()
                }).catch((err) => {
                    alert(err.message)
                })
            }
        },
        mounted(){
            getDocs(query(collection(db , 'contacts'))).then((res) => {
                res.forEach((doc) => {
                    let obj = doc.data();
                    obj.id = doc.id;
                    this.contacts.push(obj)
                })
            }).catch((err) => {
                alert(err.message)
            })
        }
    }
</script>

<style scoped>
th , td {
    padding: 0.5rem 2rem;
    border: 1px gray solid;
}
</style>