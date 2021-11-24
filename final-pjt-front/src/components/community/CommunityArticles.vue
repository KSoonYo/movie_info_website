<template>
  <section class="overflow-auto d-flex flex-column align-items-center">
      <b-table id="my-table" fixed bordered hover 
        :items="items" 
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="rowClicked"
        class="my-bg"
      >
        <template #table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :class="[{category : field.key === '분류'}, {title : field.key === '제목'}]"
            >
        </template>
      </b-table>
      <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
<!-- 
     <b-pagination-nav :link-gen="linkGen"
      v-model="currentPage"
      :number-of-pages="rows / perPage + (rows % perPage ? 1 : 0)"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table" use-router></b-pagination-nav> -->
<!-- 
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav> -->

    </section>
</template>

<script>

export default {
  name: 'CommunityArticles',

  data(){
    return{
      perPage: 20,
      currentPage: 1,
      fields: ['분류', '제목', '작성자', '작성시간'],
      article: ''
    }
  },

  props:{
    items:{
      type: Array
    }
  },

  computed:{
    rows(){
      return this.items.length
    },
  },

  methods:{
    rowClicked(item){
      this.$store.dispatch('getArticle', item.id)
    },

    // linkGen(pageNum) {
    //   return pageNum === 1 ? '?' : `?page=${pageNum}`
    // }
  }

}
</script>

<style>
.category{
  text-align: center;
  width: 5%;
}

.title{
  width: 60%;
}

thead{
  color: white;
}

tbody{
  cursor: pointer;
  color: white;
  
}

tr:hover{
  background-color: rgb(111, 74, 142);
}
.my-bg {
  background-color: rgb(34, 40, 49);
  border-color: rgb(6, 92, 179) !important;
}
</style>