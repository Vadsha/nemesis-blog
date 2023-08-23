<template>
    <div class="flex items-center justify-center w-screen h-screen root">
        <form @submit.prevent="login" class="p-8 text-white sm:w-1/3" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;" >
            <img src="@/assets/images/logo.png" class="w-20 mx-auto mb-6 rounded-full" alt="">
            <div class="my-8">
                <label for="email">Email</label>
                <input required v-model="email" type="email" class="w-full bg-transparent border-b outline-none caret-makeup-1 border-makeup-2">
            </div>
            <div class="my-8">
                <label for="password">Password</label>
                <input required v-model="password" type="text" class="w-full bg-transparent border-b outline-none caret-makeup-1 border-makeup-2">
            </div>
            <button class="float-right px-6 py-1.5 bg-makeup-1 rounded-3xl">sign in</button>
        </form>
    </div>
</template>

<script>
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

    export default {
        data() {
            return {
                email : '',
                password : ''
            }
        },
        methods : {
            login() {
                signInWithEmailAndPassword(auth , this.email , this.password).then(() => {
                    auth.onAuthStateChanged((user) => {
                      if (user) {
                        localStorage.setItem('nemesis_id_token' , user.toJSON().uid)
                        this.$router.push({name : 'HomeView'})
                      }
                    });
                }).catch(() => {})
            }
        }
    }
</script>

<style scoped>
.root {
    background-image: url('@/assets/images/bg.png');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>