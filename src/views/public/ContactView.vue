<template>
    <div>
        <svg class="mt-4 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path fill="#eee" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path></svg>
        <div class="mt-[-1px] relative sm:px-4 px-1 py-8 bg-white text-gray-1">

            <transition name="dialog">
                <dialog v-if="messaged" class="p-6 text-white bg-makeup-2" open>
                    <h1 class="text-2xl text-center">Thank you for reaching me.</h1>
                    <p class="text-center">I'll be get in touch as soon as possible.</p>
                </dialog>
            </transition>

            <h1 class="w-full text-2xl text-center">Get in Touch</h1>
            <form @submit.prevent="contact" class="flex-wrap p-4 mx-auto my-8 sm:flex sm:w-3/4">
                <div class="mb-4 sm:pr-2 sm:w-1/2">
                    <label for="name">Name</label>
                    <input required v-model="formData.name" placeholder=" . . . . " type="text" class="w-full p-1 bg-transparent border rounded outline-none border-gray-1 caret-makeup-1">
                </div>
                <div class="mb-4 sm:pl-2 sm:w-1/2">
                    <label for="email">Email</label>
                    <input required v-model="formData.email" placeholder=" . . . . " type="text" class="w-full p-1 bg-transparent border rounded outline-none border-gray-1 caret-makeup-1">
                </div>
                <div class="w-full mb-4">
                    <label for="name">Message</label>
                    <textarea required v-model="formData.message" placeholder=" . . . . "  class="w-full p-1 bg-transparent border rounded outline-none caret-makeup-1 border-gray-1" cols="30" rows="3"></textarea>
                </div>
                <div class="flex justify-end w-full">
                    <button class="px-6 py-2 text-white transition border rounded-3xl border-makeup-1 hover:bg-transparent hover:text-gray-1 bg-makeup-1">Submit</button>
                </div>
            </form>
            <div class="mx-auto sm:flex sm:w-3/4">
                <div  style="box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 10px;" class="flex flex-col items-center p-6 m-4 rounded sm:w-1/2" v-for="item in contactItems" :key="item.name">
                    <span style="margin: 6px 0px;padding: 0.5rem;color:white;background-color: #FF4C60;border-radius: 50%;" class="material-icons-sharp">{{ item.icon }}</span>
                    <p>{{ item.value }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

    export default {
        data() {
            return {
                messaged : false,
                formData : {
                    name : '',
                    email : '',
                    message : ''
                },
                contactItems : [
                    {
                        name : 'Email',
                        value : 'heinzwe2626@gmail.com',
                        icon : 'email'
                    },
                    {
                        name : 'Phone',
                        value : 'Currently Unavailable',
                        icon : 'call'
                    },
                    {
                        name : 'Address',
                        value : 'Insein, Yangon',
                        icon : 'location_on'
                    },
                ]
            }
        },
        mounted() {
            document.title = 'Contact'
        },

        methods : {
            contact() {
                addDoc( collection(db , 'contacts'), this.formData).then(() => {
                    this.messaged = true;
                    setTimeout(() => {
                        this.messaged = false
                    } , 2000)
                    this.formData = {}
                }).catch(() => {});
            }
        }
    }
</script>

<style scoped>
.dialog-enter-from , .dialog-leave-to {
  transform: translateY(30px);
  opacity: 0.5;
}
.dialog-enter-active , .dialog-leave-active {
  transition: all 0.5s ease-out;
}
</style>