<template>
  <section class="overflow-auto d-flex flex-column align-items-center row">
      <b-table id="my-table" fixed hover 
        :items="items" 
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="rowClicked"
        class="my-bg p-3"
      >
        <template #table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :class="[{category : field.key === '분류'}, {title : field.key === '제목'}]"
            >
        </template>
      </b-table>
<!-- 
      <b-container>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
          ></b-pagination>
      </b-container>
       -->
      <b-container 
        class="pagination-container">
        <b-pagination 
        :container-class="'pagination'"
        :pageClass="'page-item'"
        :pageLinkClass="'page-link-item'"
        aria-controls="my-table"
        align="center"
        v-model="currentPage"
        pills :total-rows="rows">
        </b-pagination>
      </b-container>

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
  text-align: center !important;
  /* grid-column: 1/2; */
}

.title{
  width: 60%;
  /* grid-column: 2/5; */
}

table{
  border-radius: 15px;
  border-collapse: unset !important;
}

thead{
  color: white;
  border: none !important; 
}

tbody{
  cursor: pointer;
  color: white;
 
}

tbody > tr:hover{
  background-color: rgb(211, 209, 212);
  font-weight: bold;
  color: black;
}

.table.b-table.b-table-fixed {
    table-layout: unset !important;
}

#my-table{
  border: none !important;
}
.my-bg {
  background-color: rgb(39, 46, 56);
}



/* 
.pagination ul {
        text-align: right;        
      }
      
     .pagination li {
          float: right !important;
        }
         */

.pagination .page-item {
        color: black;
        border: black;
}

.pagination .page-link {
        color: white;
}

.pagination .page-item.active .page-link {
        color: white;
        background-color: rgb(111, 74, 142) ;
        border: 1px solid rgb(111, 74, 142)
}

</style>