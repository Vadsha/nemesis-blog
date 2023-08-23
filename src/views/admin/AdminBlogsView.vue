<template>
    <div>
        <div class="flex justify-end p-4 text-white">
            <button @click="toggleView(true , false)" class="px-8 py-1" :class="indexTable ? 'bg-makeup-2' : 'bg-dark-blue'">table</button>
            <button @click="toggleView(false , true)" class="px-8 py-1" :class="createForm ? 'bg-makeup-2' : 'bg-dark-blue'">new</button>
        </div>
        <BlogsIndex @showBlog="showBlogDetail" v-if="indexTable" />
        <CreateBlog @cancel="toggleView(true , false)" v-if="createForm" />
        <ShowBlog  @cancel="toggleView(true , false)" v-if="showDetail" :id="idForDetailAndEdit" @editBlog="showEditForm" />
        <EditBlog @cancel="toggleView(true , false)" :id="idForDetailAndEdit" v-if="editForm" />
    </div>
</template>

<script>
import BlogsIndex from '@/components/admin/BlogsIndex.vue'
import CreateBlog from '@/components/admin/CreateBlog.vue'
import ShowBlog from '@/components/admin/ShowBlog.vue'
import EditBlog from '@/components/admin/EditBlog.vue'
    export default {
        components : {
            BlogsIndex , CreateBlog , EditBlog , ShowBlog
        },
        data () {
            return {
                indexTable : true,
                createForm : false,
                editForm : false,
                showDetail : false,
                idForDetailAndEdit : null,
            }
        },
        methods : {
            toggleView(index , create){
                this.indexTable = index;
                this.createForm = create;
                this.editForm = this.showDetail = false;
            },
            showBlogDetail(id) {
                this.indexTable =  this.indexTable = this.createForm = this.editForm =false;
                this.showDetail = true;
                this.idForDetailAndEdit = id;
            },
            showEditForm (id) {
                this.indexTable = this.createForm = this.showDetail = false;
                this.editForm = true;
                this.idForDetailAndEdit = id;
            },
        }
    }
</script>

<style scoped>

</style>