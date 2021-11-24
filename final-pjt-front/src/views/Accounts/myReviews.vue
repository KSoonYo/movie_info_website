<template>
  <div>
      <article v-for="myReview in myReviews" :key="myReview.id">
        <p> {{ myReview.movie.title }} </p>
        <span>{{ myReview.rank === 1 ? '★☆☆☆☆' : myReview.rank === 2 ? '★★☆☆☆' : myReview.rank === 3 ? '★★★☆☆' : myReview.rank === 4 ? '★★★★☆' : '★★★★★'}}</span>
        <p>
          ☞ {{ myReview.content}}
        </p>
      </article>

  </div>
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