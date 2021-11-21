<template>
  <section class="overflow-auto">

      <b-table id="my-table" fixed bordered hover 
        :items="items" 
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="rowClicked"
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
  </nav>

    </section>
</template>

<script>


export default {
  name: 'CommunityArticles',
   data(){
    return{
      perPage: 4,
      currentPage: 1,
      fields: ['분류', '제목', '작성자', '작성시간'],
      items: [
        { id: 1, 분류: '자유', 제목: '안녕하세요', 작성자: 'ssoosoon', 작성시간:'2021-11-18'},
        { id: 2, 분류: '추천', 제목: '이 영화를 추천합니다.', 작성자: 'ssoosoon', 작성시간:'2021-11-18'},
        { id: 3, 분류: '자유', 제목: '만세', 작성자: 'ssoosoon', 작성시간:'2021-11-18'},
        { id: 4, 분류: '자유', 제목: '만세', 작성자: 'ssoosoon', 작성시간:'2021-11-18'},
        { id: 5, 분류: '자유', 제목: '만세', 작성자: 'ssoosoon', 작성시간:'2021-11-18'},
        { id: 6, 분류: '자유', 제목: '만세', 작성자: 'ssoosoon', 작성시간:'2021-11-18'},

      ],
    }
  },

  computed:{
    rows(){
      return this.items.length
    }
  },

  methods:{
    rowClicked(item){
      // console.log('clicked!')
      this.$router.push({name: 'CommunityArticle', params:{ articleId : item.id}} ).catch(()=>{})
    },

    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    }
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

tbody{
  cursor: pointer;
}
</style>