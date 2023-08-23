<template>
    <div>
        <svg class="mt-4 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path fill="#eee" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path></svg>
        <div class="sm:flex justify-center mt-[-1px] px-1 py-12 bg-white text-gray-1">
            <main class="sm:w-[40%] px-8 h-fit">
                <h1 class="text-xl">Hola mi amigo!</h1>
                <h2 class="mt-4 text-2xl">My name is <span class="text-makeup-1">Zwe Zar Ni</span>.And I am the creator and main author, <span class="text-makeup-1">Vaddshah</span> of <span class="text-makeup-1">Nemesis Blog</span>.</h2>
                <p class="my-6">I want this blog to be a place where I can share my thoughts and research on various subjects.
                     I work as a web developer, so I'll mainly focus on sharing things about programming.
                      Since I really enjoy watching movies, I'll be posting plenty of movie reviews and recommendations.
                       I'll also write about sports,and share personal thoughts on different topics.
                        Although this blog is personal, the company I am currently working specializes in offering cutting-edge web services and solutions.
                         Please contact me for more detail. <br>Happy reading!
                </p>
                <router-link :to="{name : 'ContactView'}" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;" class="px-4 py-2 text-white transition hover:bg-transparent hover:text-gray-1 rounded-2xl bg-makeup-1">Contact Me</router-link>
            </main>
            <img class="sm:w-[40%] h-fit mt-8 sm:mt-0 rounded" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;" src="@/assets/images/bg.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            document.title = 'About Me'
        }
    }
</script>

<style scoped>

</style>