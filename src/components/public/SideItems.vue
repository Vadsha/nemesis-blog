<template>
    <div>
        <div class="flex flex-wrap p-4 mb-6 h-fit">
            <h2 class="w-full text-xl font-semibold">Tag Cloud <span class="text-6xl text-makeup-1">.</span></h2>
            <router-link :to="{name : 'BlogsByTag' , params : {id : tag.name}}"  style="box-shadow: rgba(133, 123, 123, 0.35) 0px 5px 15px;" class="block hover:translate-y-[-2px] px-4 py-1 m-3 text-blue" v-for="tag in tags" :key="tag.name">
                # {{ tag.name }}
            </router-link>
        </div>
        <div   style="box-shadow: rgba(133, 123, 123, 0.35) 0px 5px 15px;"  class="p-4 mb-6 rounded h-fit">
            <h2 class="text-xl font-semibold">Popular Blogs <span class="text-6xl leading-4 text-makeup-1">.</span></h2>
            <div  v-for="pb in popularBlogs" :key="pb.id">
                <router-link class="flex items-center p-2 m-3 hover:shadow" :to="{name : 'ReadBlog' , params : {id : pb.id}}">
                    <img :src="pb.image" class="w-1/4 rounded sm:w-1/3 h-fit" alt="">
                    <h1 class="ml-4 mr-2 text-lg">{{ pb.title }}</h1>
                </router-link>
            </div>
        </div>
        <div   style="box-shadow: rgba(133, 123, 123, 0.35) 0px 5px 15px;"  class="p-4 text-white rounded h-fit bg-makeup-1" >
            <h1 class="my-2 text-3xl font-bold">Nemesis</h1>
            <h2 class="my-2 text-xl">Minimal Blog & Web Development</h2>
            <ContactIcons class="my-6" />
            <router-link class="px-4 py-1.5 border-white border hover:bg-white hover:text-makeup-1 rounded-2xl my-4" to="/">Contact Me</router-link>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebase'
import { getDocs , query , collection } from 'firebase/firestore'
import ContactIcons from './ContactIcons.vue'
import { useBlogsStore } from '@/stores/blogs'
    export default {
        components : {
            ContactIcons
        },
        data() {
            return {
                tags : [],
                popularBlogs : [],
                blogsStore : useBlogsStore()
            }
        },
        mounted () {
            getDocs(query(collection(db , 'blogs'))).then((res) => {
                res.forEach(doc => {
                    let obj = doc.data();
                    obj.id = doc.id;
                    this.popularBlogs.push(obj)
                })
                this.popularBlogs = this.popularBlogs.slice(0,3).sort((a , b) => {return a.links - b.likes})
            })
            if (this.blogsStore.tags.length) {
                this.tags = this.blogsStore.tags
            } else {
                getDocs(query(collection(db , 'tags'))).then((res) => {
                    res.forEach((doc) => {
                        let obj = doc.data();
                        obj.id = doc.id;
                        this.blogsStore.setTags(obj)
                    });
                    this.tags = this.blogsStore.tags;
                }).catch(() => {});
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>