import { defineStore } from 'pinia'

export const useBlogsStore = defineStore('blogs' , {
    state : () => {
        return {
            blogs : [],
            tags : [],
            books : [],
            websites : [],
            channels : [],
            faqs : [],
        }
    },
    actions : {
        setBlogs (blog) {
            this.blogs.push(blog)
        },
        setTags(tag) {
            this.tags.push(tag)
        },
        setBooks(book) {
            this.books.push(book)
        },
        setWebsites(website) {
            this.websites.push(website)
        },
        setChannels(channel) {
            this.channels.push(channel)
        },
        setFaqs(faq) {
            this.faqs.push(faq)
        }
    }
})