<template>
    <div>
        <svg class="w-full rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path fill="#eee" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path></svg>
        <div  class="flex-wrap justify-center p-1 py-12 sm:flex bg-white mt-[-1px] text-gray-1">
            <h1 class="w-full mb-8 text-2xl text-center">Resources</h1>
            <div class="sm:w-[40%]">
                <div class="my-10 sm:flex" v-if="books.length">
                    <h2 class="text-xl sm:w-1/3 sm:mx-8 text-makeup-1">Books - </h2>
                    <ul class="mx-4 sm:w-2/3">
                        <li class="p-1" v-for="book in books" :key="book.link">
                            <a :href="book.link" class="hover:text-blue" target="_blank">{{ book.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="my-10 sm:flex" v-if="websites.length">
                    <h2 class="text-xl sm:w-1/3 sm:mx-8 text-makeup-1">Websites & Pages - </h2>
                    <ul class="mx-4 sm:w-2/3">
                        <li class="p-1" v-for="website in websites" :key="website.link">
                            <a :href="website.link" class="hover:text-blue" target="_blank">{{ website.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="my-10 sm:flex" v-if="channels.length">
                    <h2 class="text-xl sm:w-1/3 sm:mx-8 text-makeup-1">Channels - </h2>
                    <ul class="mx-4 sm:w-2/3">
                        <li class="p-1" v-for="channel in channels" :key="channel.link">
                            <a :href="channel.link" class="hover:text-blue" target="_blank">{{ channel.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="text-center" v-else>
                    Loading . . .
                </div>
            </div>
            <img class="sm:w-[40%] h-fit mt-8 sm:mt-0 rounded" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;" src="@/assets/images/bg.png" alt="">
        </div>
    </div>
</template>

<script>
import { db } from '@/firebase';
import {collection, getDocs, query } from 'firebase/firestore';
import { useBlogsStore } from '@/stores/blogs';
    export default {
        data() {
            return {
                blogsStore : useBlogsStore(),
                'books' : [],
                'websites' : [],
                'channels' : [],
            }
        },
        mounted () {
            document.title = 'Resources';
            if (this.blogsStore.books.length && this.blogsStore.websites.length && this.blogsStore.channels.length) {
                this.books = this.blogsStore.books;
                this.websites = this.blogsStore.websites;
                this.channels = this.blogsStore.channels;
            } else{
                getDocs(query(collection(db , 'resources'))).then((res) => {
                    res.forEach((doc) => {
                        if(doc.data().type == 'book') {
                            this.books.push(doc.data())
                            this.blogsStore.setBooks(doc.data())
                        }
                        else if(doc.data().type == 'channel') {
                            this.channels.push(doc.data())
                            this.blogsStore.setChannels(doc.data())
                        } else {
                            this.websites.push(doc.data())
                            this.blogsStore.setWebsites(doc.data())
                        }
                    });
                }).catch(() => {});
            }
        }
    }
</script>

<style scoped>

</style>