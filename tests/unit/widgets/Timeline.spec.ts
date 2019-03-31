import { expect } from 'chai';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import sinon from 'sinon';

import Timeline from '@/components/widgets/Timeline.vue';
import Item from '@/components/widgets/timeline/Item.vue';

import { ITimeline, ITimelineItem } from '@/store/common/types';
import { Component } from 'vue';

import moment from 'moment';

describe('widgets/Timeline.vue', () => {
  let timelineData: ITimeline = { items: [] };

  beforeEach(() => {});

  it('should not display the timeline', () => {
    const wrapper = shallowMount(Timeline, {
      propsData: {
        timeline: timelineData,
      },
    });

    expect(wrapper.findAll('.timeline-container')).to.have.lengthOf(0);
  });

  it('should display the right number of Items with the correct props passed', () => {
    timelineData.items = [
      {
        internalId: '1',
        title: 'title1',
        date: moment(),
        description: 'description1',
        imageUrl: 'imagUrl1',
      },
      {
        internalId: '2',
        title: 'title2',
        date: moment(),
        description: 'description2',
        imageUrl: 'imagUrl2',
      },
    ];

    const wrapper = shallowMount(Timeline, {
      propsData: {
        timeline: timelineData,
      },
    });

    const items = wrapper.findAll(Item);
    expect(items).to.have.lengthOf(timelineData.items.length);

    items.wrappers.forEach((wrapper: any, i: any) => {
      //
      expect(wrapper.props().imageUrl).to.equal(timelineData.items[i].imageUrl);
      expect(wrapper.props().title).to.equal(timelineData.items[i].title);
      expect(wrapper.props().date).to.equal(timelineData.items[i].date);
      expect(wrapper.props().description).to.equal(
        timelineData.items[i].description,
      );
      expect(wrapper.props().editMode).to.be.false;
      expect(wrapper.props().itemIndex).to.equal(i);
      expect(wrapper.props().fadeInLeft).to.equal(i % 2 == 0);
    });
  });

  describe('#getUpdatedItems', () => {
    it('should call the correct method on the Items', () => {
      timelineData.items = [
        {
          internalId: '1',
          title: 'title1',
          date: moment(),
          description: 'description1',
          imageUrl: 'imagUrl1',
        },
        {
          internalId: '2',
          title: 'title2',
          date: moment(),
          description: 'description2',
          imageUrl: 'imagUrl2',
        },
      ];

      const getUpdatedItemsSpy = sinon.stub();
      const ItemStub: any = {
        render: () => {},
        methods: {
          emitUpdatedItem: getUpdatedItemsSpy,
        },
      };

      const wrapper = shallowMount(Timeline, {
        propsData: {
          timeline: timelineData,
        },
        stubs: {
          item: ItemStub as Component,
        },
      });

      wrapper.vm.getUpdatedItems();

      expect(getUpdatedItemsSpy.calledTwice).to.be.true;
    });
  });

  describe('#gatherItems', () => {
    it('should call the right method', () => {
      const item: ITimelineItem = {
        internalId: '1',
        title: 'title1',
        date: moment(),
        description: 'description1',
        imageUrl: 'imagUrl1',
      };

      const updatedItem = sinon.spy();

      const wrapper = shallowMount(Timeline, {
        propsData: {
          timeline: timelineData,
        },
        methods: {
          updatedItem,
        },
      });

      wrapper.vm.gatherItems(item);

      expect(updatedItem.calledOnceWith(item)).to.be.true;
    });
  });

  describe('#deleteItem', () => {
    it('should delete the timeline item at the index 1', () => {
      const item1 = {
        internalId: '1',
        title: 'title1',
        date: moment(),
        description: 'description1',
        imageUrl: 'imagUrl1',
      };

      const item2 = {
        internalId: '2',
        title: 'title2',
        date: moment(),
        description: 'description2',
        imageUrl: 'imagUrl2',
      };

      timelineData.items = [item1, item2];

      const wrapper = shallowMount(Timeline, {
        propsData: {
          timeline: timelineData,
        },
      });

      wrapper.vm.deleteItem(1);

      const updatedTimeline = wrapper.props().timeline;
      expect(updatedTimeline.items).to.have.lengthOf(1);

      expect(updatedTimeline.items[0]).to.deep.equal(item1);
    });
  });

  describe('#updatedItem', () => {
    it('should emit the right event', () => {
      const item1 = {
        internalId: '1',
        title: 'title1',
        date: moment(),
        description: 'description1',
        imageUrl: 'imagUrl1',
      };

      const wrapper = shallowMount(Timeline, {
        propsData: {
          timeline: timelineData,
        },
      });

      wrapper.vm.updatedItem(item1);

      expect(wrapper.emitted('updated-item')).to.have.lengthOf(1);
      expect(wrapper.emitted('updated-item')[0]).to.deep.equal([item1]);
    });
  });

  describe('Events listening', () => {
    describe('item/updated-item', () => {
      it('should trigger the right method', () => {
        timelineData.items = [
          {
            internalId: '1',
            title: 'title1',
            date: moment(),
            description: 'description1',
            imageUrl: 'imagUrl1',
          },
          {
            internalId: '2',
            title: 'title2',
            date: moment(),
            description: 'description2',
            imageUrl: 'imagUrl2',
          },
        ];

        const getUpdatedItemsSpy = sinon.stub();
        const gatherItems = sinon.spy();

        const ItemStub: any = {
          render: () => {},
        };

        const wrapper = shallowMount(Timeline, {
          propsData: {
            timeline: timelineData,
          },
          stubs: {
            item: ItemStub as Component,
          },
          methods: {
            gatherItems,
          },
        });

        ((wrapper.vm.$refs.items as any)[0] as Item).$emit('updated-item');
        expect(gatherItems.calledOnce).to.be.true;
      });
    });

    describe('item/deleted-item', () => {
      it('should trigger the right method', () => {
        timelineData.items = [
          {
            internalId: '1',
            title: 'title1',
            date: moment(),
            description: 'description1',
            imageUrl: 'imagUrl1',
          },
          {
            internalId: '2',
            title: 'title2',
            date: moment(),
            description: 'description2',
            imageUrl: 'imagUrl2',
          },
        ];

        const getUpdatedItemsSpy = sinon.stub();
        const deleteItem = sinon.spy();

        const ItemStub: any = {
          render: () => {},
        };

        const wrapper = shallowMount(Timeline, {
          propsData: {
            timeline: timelineData,
          },
          stubs: {
            item: ItemStub as Component,
          },
          methods: {
            deleteItem,
          },
        });

        ((wrapper.vm.$refs.items as any)[0] as Item).$emit('deleted-item');
        expect(deleteItem.calledOnce).to.be.true;
      });
    });
  });

  describe('Edit mode', () => {
    it('should pass the correct value to the items components', () => {
      timelineData.items = [
        {
          internalId: '1',
          title: 'title1',
          date: moment(),
          description: 'description1',
          imageUrl: 'imagUrl1',
        },
        {
          internalId: '2',
          title: 'title2',
          date: moment(),
          description: 'description2',
          imageUrl: 'imagUrl2',
        },
      ];

      const wrapper = shallowMount(Timeline, {
        propsData: {
          timeline: timelineData,
          editMode: true,
        },
      });

      const items = wrapper.findAll(Item);

      items.wrappers.forEach((wrapper: any, i: any) => {
        //
        expect(wrapper.props().editMode).to.be.true;
      });
    });
  });
});
