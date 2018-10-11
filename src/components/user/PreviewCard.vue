<template>
    <div class="team-item col-lg-3 col-md-6">
            <div class="item-image">
                <img src="assets/images/face6.jpg">
            </div>
            <div class="item-caption py-3">
                <div class="item-name px-2">
                    <p class="mbr-fonts-style display-5">
                       <router-link :to="{ name: 'user', params: { id: userPreview.id } }">{{ userPreview.firstName }}</router-link>
                    </p>
                </div>
                <div class="item-role px-2">
                    <p>Developer</p>
                </div>
                <div class="item-social pt-2">
                    <a href="https://twitter.com/mobirise" target="_blank">
                        <span class="p-1 socicon-twitter socicon mbr-iconfont mbr-iconfont-social"></span>
                    </a>
                    <a href="https://www.facebook.com/pages/Mobirise/1616226671953247" target="_blank">
                        <span class="p-1 socicon-facebook socicon mbr-iconfont mbr-iconfont-social"></span>
                    </a>
                    <a href="https://plus.google.com/u/0/+Mobirise" target="_blank">
                        <span class="p-1 socicon-googleplus socicon mbr-iconfont mbr-iconfont-social"></span>
                    </a>
                    <a href="https://www.linkedin.com/in/mobirise" target="_blank">
                        <span class="p-1 socicon-linkedin socicon mbr-iconfont mbr-iconfont-social"></span>
                    </a>
                    <a href="https://www.instagram.com/mobirise/" target="_blank">

                    </a>
                    <a href="https://www.youtube.com/channel/UCt_tncVAetpK5JeM8L-8jyw" target="_blank">

                    </a>
                </div>
            </div>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { UserPreview } from '@/store/users/types';

@Component
export default class PreviewCard extends Vue {
  @Prop() private userPreview!: UserPreview;
}
</script>

<style lang="scss" scoped>
</style>
