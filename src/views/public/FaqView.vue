<template>
    <div>
        <svg class="mt-4 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path fill="#eee" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path></svg>

        <div class="text-gray-1 bg-white mt-[-1px]">
            <h1 class="p-6 text-2xl text-center">Frequently Asked Questions</h1>
            <ul class="sm:flex items-center mt-[-1px] sm:px-4 px-1 flex-col pb-12" v-if="faqs.length">
                <li class="p-2 m-2 border sm:w-1/2" v-for="faq in faqs" :key="faq.id">
                    <p @click="showAnswer(faq.id)" class="z-50 flex justify-between select-none hover:text-blue">
                        <span>{{ faq.question }}</span>
                        <span style="color: red;" class="material-icons-outlined">expand_more</span>
                    </p>
                    <transition name="answer">
                        <p v-if="faq.id == clicked" class="z-20 p-2">{{ faq.answer }}</p>
                    </transition>
                </li>
            </ul>
            <div v-else class="p-8 text-2xl text-center">
                Loading . . .
            </div>
            <div class="flex flex-col items-center w-1/3 p-12 mx-auto">
                    <h2 class="p-4 text-2xl">Need More Help?</h2>
                    <router-link :to="{name : 'ContactView'}" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;" class="px-4 py-2 text-white transition hover:text-gray-1 hover:bg-transparent hover rounded-2xl bg-makeup-1">Contact Me</router-link>
            </div>

        </div>


</div>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useBlogsStore } from '@/stores/blogs';

    export default {
        data() {
            return {
                blogsStore : useBlogsStore(),
                clicked : "",
                faqs : [],
            }
        },
        methods : {
            showAnswer(id){
                if (this.clicked == id) {
                    this.clicked = "";
                } else {
                    this.clicked = id;
                }
            },
        },
        mounted () {
            document.title = 'Help Canter';
            if (this.blogsStore.faqs.length) {
                this.faqs = this.blogsStore.faqs;
            } else {
                getDocs(query(collection(db , 'faq'))).then((res) => {
                    res.forEach((doc) => {
                        let obj = doc.data();
                        obj.id = doc.id;
                        this.faqs.push(obj)
                        this.blogsStore.setFaqs(obj)
                    })
                }).catch(() => {})
            }
        }
    }

</script>

<style scoped>
.answer-enter-from , .answer-leave-to {
  transform: translateY(-10px);
}
.answer-enter-active , .answer-leave-active {
  transition: all 0.3s ease-out;
}

</style>