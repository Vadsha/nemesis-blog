<template>
    <div class="flex flex-wrap justify-around bg-white text-gray-1">
        <span v-if="!blogs.length">loading . . .</span>
        <article v-else class="md:w-[30%] sm:w-[45%] h-fit flex flex-wrap p-6 shadow-lg rounded" v-for="blog in blogs" :key="blog.id">
            <img class="w-1/3 rounded shadow-xl h-fit" :src="blog.image" alt="">
            <h1 class="w-2/3 px-3 text-xl">{{ blog.title }}</h1>
            <p class="w-1/3 text-blue py-6 tracking-widest text-center"># {{ blog.tag }}</p>
            <p class="w-1/3 py-6 tracking-widest text-center">{{ blog.date }}</p>
            <p class="flex justify-center items-center w-1/3 py-6 tracking-widest">
                <span style="color: #FC5F6F;margin-right:3px;" class="material-icons-outlined">favorite</span>
                {{ blog.likes }}
            </p>
            <p class="w-full px-4 leading-6 text-center line-clamp-5" v-html="blog.body"></p>
            <div class="flex justify-end w-full my-4 text-white">
                <button class="px-2.5 pt-2 pb-1 mx-2 rounded-full bg-makeup-1">
                    <span @click="showBlog(blog.id)" class="material-icons-sharp">more_horiz</span>
                </button>
            </div>
        </article>
    </div>
</template>

<script>
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/firebase'
    export default {
        data(){
            return {
                blogs : [],
            }
        },
        methods : {
            showBlog(id){
                this.$emit('showBlog' , id)
            }
        },
        mounted () {
            getDocs(query(collection(db , 'blogs'))).then((res) => {
                res.forEach((doc) => {
                    let obj = doc.data();
                    obj.id = doc.id;
                    this.blogs.push(obj)
                })
            })
        }
    }
</script>

<style scoped>

</style>