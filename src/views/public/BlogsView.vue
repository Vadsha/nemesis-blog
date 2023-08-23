<template>
    <div>
        <svg class="mt-4 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path fill="#eee" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path></svg>

        <div class="sm:flex flex-wrap mt-[-1px] sm:px-4 px-1 py-8 bg-white text-gray-1">
            <p class="w-full text-center" v-if="!blogs.length">loading . . .</p>
            <article  v-else style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;" class="md:w-[30%] p-3 sm:p-6 rounded my-8 sm:mx-4" v-for="blog in blogs" :key="blog.id">
                <router-link class="flex flex-wrap w-full h-fit " :to="{name : 'ReadBlog' , params : {id : blog.id}}">
                    <img class="w-1/3 rounded shadow-xl h-fit" :src="blog.image" alt="">
                    <h1 class="w-2/3 px-3 text-xl">{{ blog.title }}</h1>
                    <p class="w-1/2 py-6 tracking-widest text-center">{{ blog.date }}</p>
                    <p class="flex items-center justify-center w-1/2 py-6 tracking-widest">
                        <span style="color: #FC5F6F;margin-right:3px;" class="material-icons-outlined">favorite</span>
                        {{ blog.likes }}
                    </p>
                    <p class="w-full px-4 leading-6 text-center line-clamp-5" v-html="blog.body"></p>
                    <div class="flex justify-between w-full text-lg sm:p-4">
                        <p class="w-1/3 py-6 tracking-widest text-center text-blue"># {{ blog.tag }}</p>
                        <p class="flex items-center justify-center w-2/3">
                            <img class="w-8 mx-2 rounded-full" src="@/assets/images/logo.png" alt="">
                            {{ blog.author }}
                        </p>
                    </div>
                </router-link>
            </article>
        </div>

    </div>
</template>

<script>
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import {useBlogsStore} from '@/stores/blogs'
    export default {
        data(){
            return {
                blogs : [],
                blogsStore : useBlogsStore()
            }
        },
        mounted () {
            document.title = 'Nemesis Blog'
            if (this.blogsStore.blogs.length) {
                this.blogs = this.blogsStore.blogs;
            } else {
                getDocs(query(collection(db , 'blogs') , orderBy("likes" , "desc"))).then((res) => {
                    res.forEach((doc) => {
                        let obj = doc.data();
                        obj.id = doc.id;
                        this.blogsStore.setBlogs(obj)
                    });
                    this.blogs = this.blogsStore.blogs
                }).catch(() => {});
            }
        }
    }
</script>

<style scoped>

</style>