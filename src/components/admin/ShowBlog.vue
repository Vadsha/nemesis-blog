<template>
    <div class="bg-white text-gray-1">
        <span v-if="!blog">loading . . .</span>
        <article v-else class="p-12 rounded shadow-lg">
            <span @click="cancelShow" style="position:absolute;margin: 15px 0px;background-color: gray;color: white;border-radius: 50%;padding: 5px;cursor: pointer;" class="material-icons-outlined">arrow_back</span>
            <img class="w-1/2 mx-auto rounded shadow-xl h-fit" :src="blog.image" alt="">
            <h1 class="py-3 text-xl text-center">{{ blog.title }}</h1>
            <div class="flex">
                <p class="w-1/3 py-6 tracking-widest text-center text-blue"># {{ blog.tag }}</p>
                <p class="w-1/3 py-6 tracking-widest text-center">{{ blog.date }}</p>
                <p class="flex items-center justify-center w-1/3 py-6 tracking-widest">
                    <span style="color: #FC5F6F;margin-right:3px;" class="material-icons-outlined">favorite</span>
                    {{ blog.likes }}
                </p>
            </div>
            <p class="w-full px-4 leading-6" v-html="blog.body"></p>
            <div class="flex justify-end w-full my-4 text-white">
                <button class="px-2.5 pt-2 pb-1 mx-2 rounded-full bg-makeup-1">
                    <span @click="editBlog(blog.id)" class="material-icons-sharp">edit</span>
                </button>
                <button class="px-2.5 pt-2 pb-1 mx-2 rounded-full bg-makeup-1">
                    <span @click="deleteBlog(blog.id)" class="material-icons-sharp">delete</span>
                </button>
            </div>
        </article>
    </div>
</template>

<script>
import { db } from '@/firebase'
import { getDoc, doc, deleteDoc } from 'firebase/firestore'
    export default {
        props : {
            id : {
                required : true
            }
        },
        data() {
            return {
                blog : {}
            }
        },

        methods : {
            editBlog(id) {
                this.$emit('editBlog' , id)
            },
            cancelShow(){
                this.$emit('cancel')
            },
            deleteBlog(id) {
                deleteDoc(doc(db , 'blogs' , id)).then(() => {
                    window.location.reload()
                }).catch((err) => {
                    alert(err.message);
                })
            }
        },

        mounted () {
            getDoc(doc(db , 'blogs' , this.id)).then((res) => {
                this.blog = res.data();
                this.blog.id = res.id;
            }).catch((err) => {
                alert('Error getting blog' , err.message)
            })
        },

    }
</script>

<style scoped>

</style>