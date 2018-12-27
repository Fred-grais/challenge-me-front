<template>
  <div class="project-profile">
    <pulse-loader :loading="isFetching"></pulse-loader>

    <div class="errors">
      <div class="error" v-for="error in errors" :key="error">{{ error }}</div>
    </div>

    <div class="details" v-if="currentProject">
      <section class="header3 cid-r3anIOoz7O mbr-parallax-background" id="header3-v">
        <div class="container">
          <div class="media-container-row">
            <div class="mbr-figure" style="width: 90%;">
              <img src="assets/images/01.jpg" alt="Mobirise">
            </div>

            <div class="media-content">
              <h1
                class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1"
              >{{ currentProject.name }}</h1>

              <div class="mbr-section-text mbr-white pb-3">
                <p class="mbr-text mbr-fonts-style display-5">{{ currentProject.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <b-tabs v-on:input="onTabActivation">
        <b-tab title="Project details" active>
          <section class="mbr-section article content1 cid-r3anVGgI6p" id="content2-x">
            <div class="container">
              <div class="media-container-row">
                <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
                  <blockquote>
                    <strong>From {{ currentProject.ownerFull.firstName }} {{ currentProject.ownerFull.lastName }} ({{ currentProject.ownerFull.position }})</strong> Mobirise vous aide à réduire le temps de développement en vous fournissant un éditeur de site Web flexible avec une interface glisser-déposer. Mobirise Website Builder crée un responsive, retina et
                    <strong>Sites compatible mobile</strong> en quelques clics. Mobirise est l'un des outils de développement de sites Web les plus simples
                    <a href="https://mobirise.com/">disponible</a> aujourd'hui. Il vous donne également la liberté de développer autant de sites que vous le souhaitez.
                  </blockquote>
                </div>
              </div>
            </div>
          </section>
        </b-tab>
        <b-tab title="Timeline">
          <section class="mbr-section article content11 cid-r3anUdQS9i" id="content11-w">
            <timeline-viewer :timeline="currentProject.timeline"></timeline-viewer>
          </section>
        </b-tab>
        <b-tab title="More">
          <section class="mbr-section article content11 cid-r3anUdQS9i" id="content11-w">
            <div class="container">
              <div class="media-container-row">
                <div class="mbr-text counter-container col-12 col-md-8 mbr-fonts-style display-7">
                  <ol>
                    <li>
                      <strong>ADAPTÉ AU MOBILE</strong> - Aucune action spéciale requise, tous les sites que vous créez avec Mobirise sont adaptés aux mobiles. Vous n'avez pas besoin de créer une version spéciale mobile de votre site, elle s'adaptera automagiquement.
                      <a href="https://mobirise.com/">Essayer maintenant !</a>
                    </li>
                    <li>
                      <strong>FACILE ET SIMPLE</strong> - Réduire le temps de développement avec l'éditeur de site Web glisser-déposer. Déposez les blocs dans la page, modifiez le contenu et publiez - aucune compétence technique requise.
                      <a href="https://mobirise.com/">Essayer maintenant !</a>
                    </li>
                    <li>
                      <strong>STYLES UNIQUES</strong> - choisissez parmi une vaste sélection de blocs pré-faits - intro en plein écran, carrousel bootstrap, diapositive, galerie d'images adaptatif avec lightbox, défilement parallaxe, arrière-plans vidéo, menu hamburger, en-tête sticky et plus encore.
                      <a href="https://mobirise.com/">Essayer maintenant !</a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section class="mbr-section article content3 cid-r3anWMIdf6" id="content3-y">
            <div class="container">
              <div class="media-container-row">
                <div class="row col-12 col-md-8">
                  <div
                    class="col-12 col-md-6 pr-lg-4 mbr-text mbr-fonts-style display-7"
                  >Créez votre propre site web en quelques clics! Mobirise vous aide à réduire le temps de développement en vous fournissant un éditeur de site Web flexible avec une interface glisser-déposer. Mobirise Website Builder crée en quelques clics des sites Web réactifs, adaptés aux écran Retina et mobiles. Mobirise est l'un des outils de développement de sites Web les plus faciles à utiliser aujourd'hui. Il vous donne également la liberté de développer autant de sites que vous le souhaitez.</div>
                  <div
                    class="col-12 col-md-6 pl-lg-4 mbr-text mbr-fonts-style display-7"
                  >Créez votre propre site web en quelques clics! Mobirise vous aide à réduire le temps de développement en vous fournissant un éditeur de site Web flexible avec une interface glisser-déposer. Mobirise Website Builder crée en quelques clics des sites Web réactifs, adaptés aux écran Retina et mobiles. Mobirise est l'un des outils de développement de sites Web les plus faciles à utiliser aujourd'hui. Il vous donne également la liberté de développer autant de sites que vous le souhaitez.</div>
                </div>
              </div>
            </div>
          </section>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { Project } from '@/store/current-project/types';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';
import TimelineViewer from '@/components/widgets/TimelineViewer.vue';

const currentProjectNamespace: string = 'currentProjectState';

import { ITimeline } from '@/store/common/types';
import globalEventBus from '@/services/global-event-bus';

@Component({
  components: {
    PulseLoader,
    TimelineViewer,
  },
})
export default class ProjectProfile extends Vue {
  public errors: string[] = [];

  @Getter('getCurrentProject', { namespace: currentProjectNamespace })
  public currentProject!: Project;
  @Getter('getFetchingState', { namespace: currentProjectNamespace })
  public isFetching!: boolean;

  @Action('fetchData', { namespace: currentProjectNamespace })
  public fetchData!: (projectId: number) => Promise<any>;

  public created() {
    this.fetchProjectDetails();
  }

  public fetchProjectDetails() {
    this.fetchData(+this.$route.params.id).catch((error) => {
      this.errors.push(
        error.message || 'An error occured, please try again later.',
      );
    });
  }

  public onTabActivation(tabIndex: number) {
    if (tabIndex === 1) {
      globalEventBus.$emit('timeline-tab-activated');
    }
  }

  @Watch('$route')
  public onRouteChanged(val: string, oldVal: string) {
    this.fetchProjectDetails();
  }
}
</script>

<style lang="scss" scoped>
</style>
