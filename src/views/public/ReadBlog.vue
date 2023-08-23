<template>
    <div :key="$route.fullPath" v-if="blog">
        <svg class="mt-4 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path fill="#eee" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path></svg>

        <div class="bg-white mt-[-1px] text-gray-1">
            <span v-if="!blog">loading . . .</span>
            <div class="py-4 md:flex" v-else>

                <article v-if="blog.image" class="rounded md:w-2/3 md:px-12">
                <img class="w-3/4 mx-auto rounded shadow-xl sm:w-2/3 h-fit" :src="blog.image" alt="">
                <h1 class="py-3 text-xl text-center">{{ blog.title }}</h1>
                <div class="flex justify-between">
                    <p class="w-1/3 py-6 tracking-widest text-center text-blue"># {{ blog.tag }}</p>
                    <p class="items-center justify-center hidden w-1/3 text-xl sm:flex">
                        <img src="@/assets/images/logo.png" class="w-8 mx-3 rounded-full" alt="">
                        {{ blog.author }}
                    </p>
                    <p class="w-1/3 py-6 tracking-widest text-center">{{ blog.date }}</p>
                </div>
                <p class="w-full px-4 leading-6" v-html="blog.body"></p>
                <div class="flex justify-between w-full my-4 sm:justify-end">
                    <p class="flex items-center justify-center text-xl sm:hidden">
                        <img src="@/assets/images/logo.png" class="w-8 mx-3 rounded-full" alt="">
                        {{ blog.author }}
                    </p>
                    <p v-if="!liked" class="flex items-center justify-center w-1/3 py-6 tracking-widest">
                        <span @click="addLike" style="color: #FC5F6F;margin-right:3px;cursor: pointer;" class="material-icons-outlined">favorite_border</span>
                        {{ blog.likes }}
                    </p>
                    <p v-else class="flex items-center justify-center w-1/3 py-6 tracking-widest">
                        <span style="color: #FC5F6F;margin-right:3px;" class="material-icons-outlined">favorite</span>
                        {{ blog.likes }}
                    </p>
                </div>
                </article>

                <SideItems v-if="blog" :tag="blog.tag" class="p-2 h-fit md:w-1/3" />

            </div>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebase'
import { getDoc, doc, updateDoc} from 'firebase/firestore'
import SideItems from '@/components/public/SideItems.vue'
    export default {
        components : {
            SideItems
        },
        data(){
            return {
                id : this.$route.params.id,
                liked : false,
                blog : {},
            }
        },
        watch: {
            $route(to, from) {
                if(to.fullPath != from .fullPath)
                    window.location.reload()
                }
        },
        methods : {
            addLike() {
                this.liked = true;
                this.blog.likes++;
                updateDoc(doc(db , 'blogs' , this.blog.id) , {"likes" : this.blog.likes})
                localStorage.setItem(this.blog.id , 1);
            }
        },
        mounted () {
            getDoc(doc(db , 'blogs' , this.id)).then((res) => {
                this.blog = res.data();
                this.blog.id = res.id;
                document.title = this.blog.title
                this.liked = localStorage.getItem(this.blog.id)
            }).catch(() => {
                this.$router.push({name : 'NotFound' , params : {catchAll : 'error'}});   
            });
        }

    }
</script>

<style scoped>

</style>