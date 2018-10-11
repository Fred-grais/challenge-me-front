<template>
  <div class="home">
    <SitePresentation/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SitePresentation from '@/components/home/SitePresentation.vue'; // @ is an alias to /src


@Component({
  components: {
    SitePresentation,
  },
})
export default class Home extends Vue {}
</script>
