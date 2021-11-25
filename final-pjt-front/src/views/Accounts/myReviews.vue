<template>
  <section class="px-0">
    <div class="row px-0 mx-0">
      <article class="d-flex flex-column align-items-between col-3 mt-2 px-0" v-for="myReview in myReviews" :key="myReview.id">
        <div class="col-12 mb-5">
          <div class="my-bg h-100 mx-4 mb-4 rounded">
            <div class="d-flex flex-column mt-3 mb-0 justify-content-center">
              <p class="mt-5"> {{ myReview.movie.title }} </p>
              <p class="mt-3 pt-3">{{ myReview.rank === 1 ? '★☆☆☆☆' : myReview.rank === 2 ? '★★☆☆☆' : myReview.rank === 3 ? '★★★☆☆' : myReview.rank === 4 ? '★★★★☆' : '★★★★★'}}</p>
            </div>
            <div class="mt-3 pt-1">
              <p class="mb-0">☞ {{ myReview.content}}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'myReviews',
  computed:{
    myReviews(){
      return this.$store.state.myReviews
    }
  }
}
</script>

<style>

</style>