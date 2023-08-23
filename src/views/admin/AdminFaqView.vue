<template>
    <div class="flex flex-wrap justify-around p-8 bg-white text-gray-1">
        <h1 class="w-full mb-8 text-3xl text-center">FAQ</h1>
        <ul class="sm:w-1/2" v-if="faqs.length">
            <li class="p-2 m-4 border" v-for="faq in faqs" :key="faq.id">
                <p @click="showAnswer(faq.id)" class="z-50 flex justify-between select-none hover:text-blue">
                    <span>{{ faq.question }}</span>
                    <span style="color: red;" class="material-icons-outlined">expand_more</span>
                </p>
                <transition name="answer">
                    <p v-if="faq.id == clicked" class="z-20 p-2">{{ faq.answer }}</p>
                </transition>
            </li>
        </ul>
        <div v-else class="text-2xl">
            Loading . . .
        </div>

        <form @submit.prevent="createResource" class="p-8 shadow-lg sm:w-1/3 h-fit">
            <h1 class="mb-6 text-xl text-center">Create FAQ</h1>
            <div class="mt-2">
                <label for="name">Question</label>
                <input v-model="formData.question" type="text" placeholder=" . . . . . ." class="w-full p-1 mt-1 bg-transparent border outline-none border-gray-1">
            </div>
            <div class="mt-2">
                <label for="name">Answer</label>
                <input v-model="formData.answer" type="text" placeholder=" . . . . . ." class="w-full p-1 mt-1 bg-transparent border outline-none border-gray-1">
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
                clicked : "",
                faqs : [],
                formData : {
                    question : '',
                    answer : '',
                }
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
            createResource() {
                addDoc(collection(db , 'faq') , this.formData).then(() => {
                    window.location.reload()
                }).catch((err) => {
                    alert(err.message)
                })
            }
        },
        mounted () {
            getDocs(query(collection(db , 'faq'))).then((res) => {
                res.forEach((doc) => {
                    let obj = doc.data();
                    obj.id = doc.id;
                    this.faqs.push(obj)
                })
            }).catch((err) => {
                alert(err.message)
            })
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