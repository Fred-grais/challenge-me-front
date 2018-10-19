<template>
  <div class="timeline-container" v-if="displayTImeline()">
    <header>
      <div class="container text-center">
        <h1>Vertical Timeline</h1>
        <p>Sava Lazic</p>
      </div>
    </header>

    <section class="timeline">
      <div class="container">
        <Item v-for="(item, index) in items" :key="index" :fadeInLeft="index % 2 == 0" :title="item.title" :date="item.date" :description="item.description"></Item>

        <!-- <div class="timeline-item">
          <div class="timeline-img"></div>

          <div class="timeline-content js--fadeInLeft">
            <h2>Title</h2>
            <div class="date">1 MAY 2016</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor, nostrum excepturi amet in dolores. Alias, ullam.</p>
            <a class="bnt-more" href="javascript:void(0)">More</a>
          </div>
        </div>

        <div class="timeline-item">

          <div class="timeline-img"></div>

          <div class="timeline-content timeline-card js--fadeInRight">
            <div class="timeline-img-header">
              <h2>Card Title</h2>
            </div>
            <div class="date">25 MAY 2016</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor, nostrum excepturi amet in dolores. Alias, ullam.</p>
            <a class="bnt-more" href="javascript:void(0)">More</a>
          </div>

        </div>

        <div class="timeline-item">

          <div class="timeline-img"></div>

          <div class="timeline-content js--fadeInLeft">
            <div class="date">3 JUN 2016</div>
            <h2>Quote</h2>
            <blockquote>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo debitis omnis dolor iste fugit totam quasi inventore!</blockquote>
          </div>
        </div>

        <div class="timeline-item">

          <div class="timeline-img"></div>

          <div class="timeline-content js--fadeInRight">
            <h2>Title</h2>
            <div class="date">22 JUN 2016</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor, nostrum excepturi amet in dolores. Alias, ullam.</p>
            <a class="bnt-more" href="javascript:void(0)">More</a>
          </div>
        </div>

        <div class="timeline-item">

          <div class="timeline-img"></div>

          <div class="timeline-content timeline-card js--fadeInLeft">
            <div class="timeline-img-header">
              <h2>Card Title</h2>
            </div>
            <div class="date">10 JULY 2016</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor, nostrum excepturi amet in dolores. Alias, ullam.</p>
            <a class="bnt-more" href="javascript:void(0)">More</a>
          </div>
        </div>

        <div class="timeline-item">

          <div class="timeline-img"></div>

          <div class="timeline-content timeline-card js--fadeInRight">
            <div class="timeline-img-header">
              <h2>Card Title</h2>
            </div>
            <div class="date">30 JULY 2016</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor, nostrum excepturi amet in dolores. Alias, ullam.</p>
            <a class="bnt-more" href="javascript:void(0)">More</a>
          </div>
        </div>

        <div class="timeline-item">

          <div class="timeline-img"></div>

          <div class="timeline-content js--fadeInLeft">
            <div class="date">5 AUG 2016</div>
            <h2>Quote</h2>
            <blockquote>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo debitis omnis dolor iste fugit totam quasi inventore!</blockquote>
          </div>
        </div>

        <div class="timeline-item">

          <div class="timeline-img"></div>

          <div class="timeline-content timeline-card js--fadeInRight">
            <div class="timeline-img-header">
              <h2>Card Title</h2>
            </div>
            <div class="date">19 AUG 2016</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor, nostrum excepturi amet in dolores. Alias, ullam.</p>
            <a class="bnt-more" href="javascript:void(0)">More</a>
          </div>
        </div>

        <div class="timeline-item">

          <div class="timeline-img"></div>

          <div class="timeline-content js--fadeInLeft">
            <div class="date">1 SEP 2016</div>
            <h2>Title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor, nostrum excepturi amet in dolores. Alias, ullam.</p>
            <a class="bnt-more" href="javascript:void(0)">More</a>
          </div>
        </div>
      </div> -->
    </div>
    </section>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ScrollReveal from 'scrollreveal'
import Item from '@/components/widgets/timeline/Item.vue';

interface TimelineItem {
  title: string;
  date: Date;
  description: string;
  fadeInLeft?: boolean;
  containImage?: boolean;
  imageUrl?: string;
}

@Component({
  components: {
    Item,
  }
})
export default class Timeline extends Vue {
  @Prop({type: Array, default: () => []}) items!: TimelineItem[];

  mounted() {
    const sr = ScrollReveal();
    sr.reveal('.js--fadeInLeft', {
	    origin: 'left',
	    distance: '300px',
		  easing: 'ease-in-out',
	    duration: 800,
	  });

	  sr.reveal('.js--fadeInRight', {
	    origin: 'right',
	    distance: '300px',
	    easing: 'ease-in-out',
	    duration: 800,
	  });
  }

  displayTImeline() {
    return this.items.length > 0;
  }

}
</script>


<style lang="scss">
  $primary: #3F51B5;
  $dark-primary: #303F9F;
  $light-primary: #C5CAE9;
  $text: #FFFFFF;
  $primary-text: #212121;
  $secondary-text: #757575;
  $accent: #FF4081;

  .timeline-container {
    font-family: 'Roboto';
    font-size: 17px;
    font-weight: 400;
    background-color: #eee;


    section {
      padding: 100px 0;
    }

    h1 {
      font-size: 200%;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-weight: 400;
    }

    header {
    	background: $primary;
    	color: $text;
    	padding: 150px 0;

    	p {
    		font-family: 'Allura';
    		color: rgba(255, 255, 255, .2);
    		margin-bottom: 0;
    		font-size: 60px;
    		margin-top: -30px;

    	}
    }

    .timeline {

    	position: relative;

    	&::before {
    		content: '';
    		background: $light-primary;
    		width: 5px;
    		height: 95%;
    		position: absolute;
    		left: 50%;
    		transform: translateX(-50%);
    	}
    }

    .timeline-item {
    	width: 100%;
    	margin-bottom: 70px;

    	&:nth-child(even) {

    		.timeline-content {
    			float: right;
    			padding: 40px 30px 10px 30px;

    			.date {
    				right: auto;
    				left: 0;
    			}

    			&::after {
    				content: '';
    				position: absolute;
    				border-style: solid;
    				width: 0;
    				height: 0;
    				top: 30px;
    				left: -15px;
    				border-width: 10px 15px 10px 0;
    				border-color: transparent #f5f5f5 transparent transparent;
    			}
    		}
    	}

    	&::after {
    		content: '';
    		display: block;
    		clear: both;
    	}
    }


    .timeline-content {
    	position: relative;
    	width: 45%;
    	padding: 10px 30px;
    	border-radius: 4px;
    	background: #f5f5f5;
    	box-shadow: 0 20px 25px -15px rgba(0, 0, 0, .3);

    	&::after {
    		content: '';
    		position: absolute;
    		border-style: solid;
    		width: 0;
    		height: 0;
    		top: 30px;
    		right: -15px;
    		border-width: 10px 0 10px 15px;
    		border-color: transparent transparent transparent #f5f5f5;
    	}
    }

    .timeline-img {
    	width: 30px;
    	height: 30px;
    	background: $primary;
    	border-radius: 50%;
    	position: absolute;
    	left: 50%;
    	margin-top: 25px;
    	margin-left: -15px;
    }

    a {
    	background: $primary;
    	color: $text;
    	padding: 8px 20px;
    	text-transform: uppercase;
    	font-size: 14px;
    	margin-bottom: 20px;
    	margin-top: 10px;
    	display: inline-block;
    	border-radius: 2px;
    	box-shadow: 0 1px 3px -1px rgba(0, 0, 0, .6);

    	&:hover, &:active, &:focus {
    		background: darken($primary, 10%);
    		color: $text;
    		text-decoration: none;
    	}

    }

    .timeline-card {
    	padding: 0!important;

    	p {
    		padding: 0 20px;
    	}

    	a {
    		margin-left: 20px;
    	}
    }

    .timeline-item {

    	&:nth-child(2) {
    		.timeline-img-header {
    			background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .4)), url('https://hd.unsplash.com/photo-1458530970867-aaa3700e966d') center center no-repeat;
    			background-size: cover;
    		}
    	}

    	&:nth-child(5) {
    		.timeline-img-header {
    			background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .4)), url('https://hd.unsplash.com/photo-1444093826349-9ce8c622f4f3') center center no-repeat;
    			background-size: cover;
    		}
    	}

    	&:nth-child(6) {
    		.timeline-img-header {
    			background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .4)), url('https://hd.unsplash.com/photo-1471479917193-f00955256257') center center no-repeat;
    			background-size: cover;
    		}
    	}

    	&:nth-child(8) {
    		.timeline-img-header {
    			background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .4)), url('https://hd.unsplash.com/photo-1466840787022-48e0ec048c8a') center center no-repeat;
    			background-size: cover;
    		}
    	}

    	&:nth-child(10) {
    		.timeline-img-header {
    			background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .4)), url('https://hd.unsplash.com/photo-1447639703758-f525f36456bf') center center no-repeat;
    			background-size: cover;
    		}
    	}

    	&:nth-child(11) {
    		.timeline-img-header {
    			background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .4)), url('https://hd.unsplash.com/photo-1469429978400-082eec725ad5') center center no-repeat;
    			background-size: cover;
    		}
    	}
    }

    .timeline-img-header {

    	height: 200px;
    	position: relative;
    	margin-bottom: 20px;

    	h2 {
    		color: $text;
    		position: absolute;
    		bottom: 5px;
    		left: 20px;
    	}
    }

    blockquote {
    	margin-top: 30px;
    	color: $secondary-text;
    	border-left-color: $primary;
    	padding: 0 20px;
    }

    .date {
    	background: $accent;
    	display: inline-block;
    	color: $text;
    	padding: 10px;
    	position: absolute;
    	top: 0;
    	right: 0;
    }

    @media screen and (max-width: 768px) {

    	.timeline {

    		&::before {
    			left: 50px;
    		}

    		.timeline-img {
    			left: 50px;
    		}

    		.timeline-content {
    			max-width: 100%;
    			width: auto;
    			margin-left: 70px;
    		}

    		.timeline-item {

    			&:nth-child(even) {

    				.timeline-content {
    					float: none;

    				}
    			}

    			&:nth-child(odd) {

    				.timeline-content {

    					&::after {
    						content: '';
    						position: absolute;
    						border-style: solid;
    						width: 0;
    						height: 0;
    						top: 30px;
    						left: -15px;
    						border-width: 10px 15px 10px 0;
    						border-color: transparent #f5f5f5 transparent transparent;
    					}
    				}

    			}
    		}
    	}
    }
  }
</style>
