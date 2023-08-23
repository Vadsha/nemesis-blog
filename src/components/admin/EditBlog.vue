<template>
    <div class="bg-white">
        <form @submit.prevent="updateBlog" class="flex flex-wrap p-8 mx-auto shadow sm:w-3/4 text-gray-1">
            <span @click="cancelEdit" style="margin: 15px 0px;background-color: gray;color: white;border-radius: 50%;padding: 5px;cursor: pointer;" class="material-icons-outlined">arrow_back</span>
            <h1 class="w-full text-2xl">Update Blog</h1>
            <div class="w-1/2 p-6 my-4">
                <label for="title">Title</label>
                <input v-model="formData.title" placeholder=" . . . . . ." type="text" class="w-full px-2 bg-transparent border-b outline-none border-gray-1 " >
            </div>
            <div class="w-1/2 p-6 my-4">
                <label for="author">Author</label>
                <input v-model="formData.author" placeholder=" . . . . . ." type="text" class="w-full px-2 bg-transparent border-b outline-none border-gray-1 " >
            </div>
            <div class="w-1/2 p-6 my-4">
                <label for="tag">Tag</label>
                <select v-model="formData.tag" class="w-full px-2 bg-transparent border-b outline-none border-gray-1 ">
                    <option disabled selected> . . . . . . </option>
                    <option v-for="tag in tags" :key="tag.name" :value="tag.name">{{ tag.name }}</option>
                </select>
            </div>
            <div class="w-1/2 p-6 my-4">
                <label for="image">Image</label>
                <input @change="uploadImage" type="file" class="w-full px-2 bg-transparent border-b outline-none cursor-pointer file:cursor-pointer file:text-gray-2 file:border-0 border-gray-1 " >
            </div>
            <div class="w-full my-24">
                <label for="description">Blog Body</label>
                <quill-editor v-model:content="formData.body" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>
                <button class="w-1/2 py-2 my-8 text-white rounded shadow bg-makeup-1">Update Blog</button>
        </form>
    </div>
</template>

<script>
import { db } from '@/firebase'
import {getStorage , ref , uploadBytes,getDownloadURL} from 'firebase/storage'
import { collection , getDocs , query , getDoc, doc, updateDoc } from 'firebase/firestore'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
    export default {
        props : {
            id : {
                required : true
            }
        },
        components : {
            QuillEditor
        },
        data() {
            return {
                tags : [],
                formData : {}
            }
        },
        methods : {
            cancelEdit(){
                this.$emit('cancel')
            },
            uploadImage(e){
                let file = e.target.files[0];
                const storage = getStorage();
                const storageRef = ref(storage, file.name);
                uploadBytes(storageRef, file).then(() => {
                    getDownloadURL(ref(storage, file.name)).then((url) => {
                        this.formData.image = url;
                    }).catch((error) => {
                    console.log(error);
                    });
                });
            },
            updateBlog(){
                updateDoc(doc(db , 'blogs' , this.id) , this.formData).then(() => {
                    window.location.reload()
                }).catch((err) => {
                    alert(err.message)
                })
            }
        },

        mounted () {
            getDocs(query(collection(db , 'tags'))).then((res) => {
                res.forEach((doc) => {
                    this.tags.push(doc.data())
                })
            }).catch((err) => {
                alert(err.message)
            })

            getDoc(doc(db , 'blogs' , this.id)).then((res) => {
                this.formData = res.data();
            }).catch((err) => {
                alert('Error getting blog' , err.message)
            })
        },

    }
</script>

<style scoped>

</style>