<template>
  <div class="list row">
    <div class="text-red" v-if="error">{{ error }}</div>

    <form action="" @submit.prevent="addArticle">
      <div class="mb-6">
        <input class="input"
          autofocus autocomplete="off"
          placeholder="Type an article title"
          v-model="newArticle.title" />
      </div>
      <div class="mb-6">
        <input class="input"
          autofocus autocomplete="off"
          placeholder="Type an article content"
          v-model="newArticle.content" />
      </div>
      <div class="mb-6">
        <label for="category" class="label">Category</label>
        <select id="category" class="select" v-model="newArticle.category">
          <option disabled value="">Select a category</option>
          <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
        </select>
      </div>
      <input type="submit" value="Add Article" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 text-white items-center justify-center" />
    </form>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item" v-for="article in articles" :key="article.id">
          {{ article.title }}
          <button @click.prevent="removeArticle(article)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articles-list',
  data () {
    return {
      articles: [],
      categories: [],
      newArticle: [],
      error: '',
      editedArticle: ''
    }
  },
  created () {
    this.retrieveArticles()
    this.retrieveCategories()
  },
  methods: {
    retrieveArticles () {
      if (!localStorage.signedIn) {
        this.$router.replace('/')
      } else {
        this.$http.secured.get('/api/v1/articles')
          .then(response => {
            this.articles = response.data
          })
          .catch(error => {
            this.setError(error, 'Something went wrong')
          })
      }
    },
    retrieveCategories () {
      if (!localStorage.signedIn) {
        this.$router.replace('/')
      } else {
        this.$http.secured.get('/api/v1/categories')
          .then(response => {
            console.log(response.data)
            this.categories = response.data
          })
          .catch(error => {
            this.setError(error, 'Something went wrong')
          })
      }
    },
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addArticle () {
      const value = this.newArticle
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/articles', { article: { title: this.newArticle.title, content: this.newArticle.content, category_id: this.newArticle.category } })
        .then(response => {
          this.articles.push(response.data)
          this.newArticle = ''
        })
        .catch(error => {
          this.setError(error, 'Couldnt Add New Article')
        })
    },
    removeArticle (article) {
      this.$http.secured.delete(`/api/v1/articles/${article.id}`)
        .then(response => {
          this.articles.splice(this.articles.indexOf(article), 1)
        })
        .catch(error => {
          this.setError(error, 'Couldnt destroy article')
        })
    }
  }
}
</script>
