<template>
    <div class="flex flex-wrap justify-around p-8 bg-white text-gray-1">
        <h1 class="w-full mb-8 text-3xl text-center">Resources</h1>
        <div class="sm:w-1/2" v-if="books.length || channels.length || websites.length">
            <div class="my-8">
                <h2 class="text-xl">Books</h2>
                <ul class="m-4 list-disc">
                    <li class="p-1" v-for="book in books" :key="book.link">
                        <a :href="book.link" target="_blank">{{ book.name }}</a>
                    </li>
                </ul>
            </div>
            <div class="my-8">
                <h2 class="text-xl">Websites & Pages</h2>
                <ul class="m-4 list-disc">
                    <li class="p-1" v-for="website in websites" :key="website.link">
                        <a :href="website.link" target="_blank">{{ website.name }}</a>
                    </li>
                </ul>
            </div>
            <div class="my-8">
                <h2 class="text-xl">Channels</h2>
                <ul class="m-4 list-disc">
                    <li class="p-1" v-for="channel in channels" :key="channel.link">
                        <a :href="channel.link" target="_blank">{{ channel.name }}</a>
                    </li>
                </ul>
            </div>

        </div>
        <div v-else class="text-2xl">
            Loading . . .
        </div>

        <form @submit.prevent="createResource" class="p-8 shadow-lg sm:w-1/3 h-fit">
            <h1 class="mb-6 text-xl text-center">Create Resource</h1>
            <div>
                <label for="name">Name</label>
                <input v-model="formData.name" type="text" placeholder=" . . . . . ." class="w-full p-1 mt-1 bg-transparent border outline-none border-gray-1">
            </div>
            <div>
                <label for="name">Link</label>
                <input v-model="formData.link" type="text" placeholder=" . . . . . ." class="w-full p-1 mt-1 bg-transparent border outline-none border-gray-1">
            </div>
            <div>
                <label for="name">Type</label>
                <select v-model="formData.type" class="w-full p-1 mt-1 bg-transparent border outline-none border-gray-1">
                    <option disabled selected></option>
                    <option value="book">Books</option>
                    <option value="website">Websites & Pages</option>
                    <option value="channel">Channels</option>
                </select>
            </div>
            <button class="w-full py-1.5 mt-3 text-white bg-makeup-1">create</button>
        </form>

    </div>
</template>

<script>
import { db } from '@/firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';

    export default {
        data() {
            return {
                'books' : [],
                'websites' : [],
                'channels' : [],
                formData : {
                    name : '',
                    link : '',
                    type : ''
                }
            }
        },
        methods : {
            createResource() {
                addDoc(collection(db , 'resources') , this.formData).then(() => {
                    window.location.reload()
                }).catch((err) => {
                    alert(err.message)
                })
            }
        },
        mounted () {
            getDocs(query(collection(db , 'resources'))).then((res) => {
                res.forEach((doc) => {
                    if(doc.data().type == 'book') {
                        this.books.push(doc.data())
                    }
                    else if(doc.data().type == 'channel') {
                        this.channels.push(doc.data())
                    } else {
                        this.websites.push(doc.data())
                    }
                })
            }).catch((err) => {
                alert(err.message)
            })
        }
    }
</script>

<style scoped>

</style>