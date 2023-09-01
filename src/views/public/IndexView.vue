<template>
        <div class="text-white wrapper">
            <main class="flex flex-wrap border-b border-gray-2 sm:w-[80%] mx-auto justify-center sm:justify-between py-8">
                <ContactIcons class="hidden w-1/4 my-auto sm:flex" />
                <div class="sm:w-1/4">
                    <img class="w-20 mx-auto bg-white rounded-full" src="@/assets/images/logo.png" alt="">
                    <h1 class="text-3xl font-bold tracking-wider text-center">Nemesis <span class="text-6xl select-none text-makeup-1">.</span></h1>
                    <h3 class="text-center">Minimal Blog & Web Development</h3>
                </div>
                <div class="justify-end hidden w-1/4 my-auto sm:flex">
                    <!-- <button class="flex items-center justify-center p-2 mx-1 transition rounded-full hover:bg-makeup-2 bg-makeup-1">
                        <span class="material-icons-sharp">search</span>
                    </button> -->
                    <button class="flex items-center justify-center p-2 mx-1 transition rounded-full hover:bg-makeup-2 bg-makeup-1">
                        <span @click="isSideBarOpened = true" class="material-icons-sharp">menu</span>
                    </button>
                </div>
                <div class="fixed z-40 block sm:hidden right-1 top-2">
                    <button @click="isSideBarOpened = true" class="flex items-center justify-center p-2 mx-1 transition rounded-full hover:bg-makeup-2 bg-makeup-1">
                        <span class="material-icons-sharp">menu</span>
                    </button>
                </div>
            </main>

            <ul class="justify-center hidden p-4 sm:flex">
                <li >
                    <router-link class="px-1 py-2 mx-3 text-lg hover:border-b border-makeup-2" :to="{name : 'HomeView'}">Home</router-link>
                </li>
                <li v-for="item in navItems" :key="item.name">
                    <router-link active-class="border-b" class="px-1 py-2 mx-3 text-lg hover:border-b border-makeup-2" :to="{name : item.path}">{{ item.name }}</router-link>
                </li>
            </ul>
            <transition name="sideBar">
                <nav v-if="isSideBarOpened" class="fixed top-0 right-0 z-50 flex flex-col justify-around h-screen py-12 text-white bg-dark-blue">
                    <span @click="isSideBarOpened = false" style="position: fixed;right: 15px; top: 15px;cursor: pointer;" class="material-icons-sharp">close</span>
                    <img class="w-20 mx-auto mb-12 bg-white rounded-full" src="@/assets/images/logo.png" alt="">
                    <ul>
                        <li @click="isSideBarOpened = false" class="py-1 pr-20 mx-12 my-3 text-lg border-b border-gray-2 hover:border-makeup-2">
                            <router-link  :to="{name : 'HomeView'}">Home</router-link>
                        </li>
                        <li @click="isSideBarOpened = false" class="py-1 pr-20 mx-12 my-3 text-lg border-b border-gray-2 hover:border-makeup-2" v-for="item in navItems" :key="item.name">
                            <router-link active-class="text-makeup-1" :to="{name : item.path}">{{ item.name }}</router-link>
                        </li>
                    </ul>
                    <ContactIcons class="mx-auto" />
                </nav>
            </transition>

            <div>
                <router-view v-slot="{Component}">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>

            <footer class="flex-wrap py-4 transition sm:flex bg-dark-blue">
                <ul class="p-4 sm:w-1/3">
                    <li class="w-1/2 mx-auto my-1">
                        <router-link class="px-1 py-2 text-lg hover:border-b border-makeup-2" :to="{name : 'HomeView'}">Home</router-link>
                    </li>
                    <li class="w-1/2 mx-auto my-1" v-for="item in navItems" :key="item.name">
                        <router-link class="px-1 py-2 text-lg hover:border-b border-makeup-2" :to="{name : item.path}">{{ item.name }}</router-link>
                    </li>
                </ul>
                <div class="p-4 my-6 sm:w-1/3 sm:my-0">
                    <h3 class="text-center">If you want to build your own awesome websites,feel free to contact me. <br><br>
                        <router-link :to="{name : 'ContactView'}" class="px-4 py-2 text-white text-itim bg-makeup-1 rounded-2xl">Contact Me</router-link>
                    </h3>
                    <ContactIcons class="flex justify-center mt-6" />
                </div>
                <div class="p-4 sm:w-1/3">
                    <img src="@/assets/images/logo.png" class="w-20 mx-auto bg-white rounded-full" alt="">
                    <h1 class="text-3xl font-bold tracking-wider text-center">
                        Nemesis <router-link :to="{name : 'LoginView'}" class="text-6xl cursor-auto select-none text-makeup-1">.</router-link>
                    </h1>
                    <p class="w-full mt-2 text-base text-center">© 2023 Nemesis. All rights reserved.</p>
                </div>
            </footer>

        </div>
</template>

<script>
import ContactIcons from '@/components/public/ContactIcons.vue'
    export default {
        components : {
            ContactIcons
        },
        data() {
            return {
                isSideBarOpened : false,
                navItems : [
                    {
                        name : 'Blogs',
                        path : 'BlogsView'
                    },
                    {
                        name : 'Resources',
                        path : 'ResourcesView'
                    },
                    {
                        name : 'FAQ',
                        path : 'FaqView'
                    },
                    {
                        name : 'About',
                        path : 'AboutView'
                    },
                    {
                        name : 'Contact',
                        path : 'ContactView'
                    },
                ]
            }
        }
    }
</script>

<style scoped>
.fade-enter-from , .fade-leave-to {
  transform: translateY(30px);
  opacity: 0.5;
}
.fade-enter-active , .fade-leave-active {
  transition: all 0.5s ease-out;
}

.sideBar-enter-from , .sideBar-leave-to {
  transform: translateX(150px);
}
.sideBar-enter-active , .sideBar-leave-active {
  transition: all 0.2s ease-out;
}


.wrapper{
    background-image: url('@/assets/images/bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>