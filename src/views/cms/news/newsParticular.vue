<template>
    <div class="detailsbox">
      <h5>{{ news.title_ }}</h5>
      <p v-if="news.create_time_" class="pspan">
        <span>发布人：（{{ news.release_name_ }}）</span>
        <span>时间：{{ news.create_time_ }}</span>
        <span>阅读量：（{{ news.visit_num_ }}）</span>
      </p>
      <div v-html="news.content_"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news:[]
        }
    },
    created() {
        this.fetchNewsDetails();
    },
    methods: {
        async fetchNewsDetails() {
                console.log(this.$route.query.id,'data')
                try {
                const data = {
                    id_: this.$route.query.id
                }
                const info = await this.$API.news.where.post(data);
                this.news = info; 
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        },
    }

}
</script>

<style lang="scss" scoped>
  .detailsbox {
    width: 1000px;
    margin: 0 auto;
    h5 {
      margin: 12px 0;
      font-size: 20px;
      color: #3892f2;
      text-align: center;
    }
    .pspan {
      font-size: 14px;
      color: #afafaf;
      text-align: center;
      span {
        margin: 0 10px;
      }
    }
    .linkspan {
      margin-left: 18px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>