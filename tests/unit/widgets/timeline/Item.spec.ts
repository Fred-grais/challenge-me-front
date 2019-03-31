import { expect } from 'chai';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import sinon from 'sinon';

import Item from '@/components/widgets/timeline/Item.vue';
import moment from 'moment';

// describe('widgets/timeline/Item.vue', () => {
// const title = 'title';
// const date = moment();
// const description = 'description';
// const fadeInLeft = true;
// const imageUrl = 'imageUrl';
// const editMode = false;
// const itemIndex = 0;

// describe('Props', () => {
//   it('should populate the props correctly', () => {
//     const wrapper = shallowMount(Item, {
//       propsData: {
//         title: title,
//         date: date,
//         description: description,
//         fadeInLeft: fadeInLeft,
//         imageUrl: imageUrl,
//         editMode: editMode,
//         itemIndex: itemIndex,
//       },
//     });

//     expect(wrapper.props().title).to.equal(title);
//     expect(wrapper.props().date).to.deep.equal(date);
//     expect(wrapper.props().description).to.equal(description);
//     expect(wrapper.props().fadeInLeft).to.equal(fadeInLeft);
//     expect(wrapper.props().imageUrl).to.equal(imageUrl);
//     expect(wrapper.props().editMode).to.equal(editMode);
//     expect(wrapper.props().itemIndex).to.equal(itemIndex);
//   });
// });

// describe('Data', () => {
//   it('should populate the data correctly', () => {
//     const wrapper = shallowMount(Item, {
//       propsData: {
//         title: title,
//         date: date,
//         description: description,
//         fadeInLeft: fadeInLeft,
//         imageUrl: imageUrl,
//         editMode: editMode,
//         itemIndex: itemIndex,
//       },
//     });

//     expect(wrapper.vm.containsImage).to.be.true;
//     expect(wrapper.vm.updatedTitle).to.equal(title);
//     expect(wrapper.vm.updatedDescription).to.equal(description);
//     expect(wrapper.vm.updatedDate).to.deep.equal(date.toDate());
//     expect(wrapper.vm.updatedImageUrl).to.equal(imageUrl);
//   });
// });

// describe('getter classObject', () => {
//   it('should return the correct value', () => {
//     const wrapper = shallowMount(Item, {
//       propsData: {
//         title: title,
//         date: date,
//         description: description,
//         fadeInLeft: fadeInLeft,
//         imageUrl: imageUrl,
//         editMode: editMode,
//         itemIndex: itemIndex,
//       },
//     });

//     expect(wrapper.vm.classObject).to.deep.equal({
//       'timeline-content': true,
//       'js--fadeInLeft': fadeInLeft,
//       'js--fadeInRight': !fadeInLeft,
//       'timeline-card': wrapper.vm.containsImage,
//     });
//   });
// });

// describe('getter headerImageUrl', () => {
//   it('should return the correct value when not in edit mode', () => {
//     const wrapper = shallowMount(Item, {
//       propsData: {
//         title: title,
//         date: date,
//         description: description,
//         fadeInLeft: fadeInLeft,
//         imageUrl: imageUrl,
//         editMode: false,
//         itemIndex: itemIndex,
//       },
//     });

//     expect(wrapper.vm.headerImageUrl).to.equal(imageUrl);

//     wrapper.setData({ updatedImageUrl: 'updatedImageUrl' });
//   });

//   it('should return the correct value when in edit mode', () => {
//     const wrapper = shallowMount(Item, {
//       propsData: {
//         title: title,
//         date: date,
//         description: description,
//         fadeInLeft: fadeInLeft,
//         imageUrl: imageUrl,
//         editMode: true,
//         itemIndex: itemIndex,
//       },
//     });
//     wrapper.setData({ updatedImageUrl: 'updatedImageUrl' });

//     expect(wrapper.vm.headerImageUrl).to.equal(wrapper.vm.updatedImageUrl);
//   });
// });

// describe('getter formattedDate', () => {
//   it('should return the correct value when in edit mode', () => {
//     const wrapper = shallowMount(Item, {
//       propsData: {
//         title: title,
//         date: date,
//         description: description,
//         fadeInLeft: fadeInLeft,
//         imageUrl: imageUrl,
//         editMode: editMode,
//         itemIndex: itemIndex,
//       },
//     });

//     expect(wrapper.vm.formattedDate).to.equal(date.format('DD MMMM YYYY'));
//   });
// });

// describe('#emitUpdatedItem', () => {
//   it('should call the correct method', () => {
//     const updatedItem = sinon.spy();
//     const wrapper = shallowMount(Item, {
//       propsData: {
//         title: title,
//         date: date,
//         description: description,
//         fadeInLeft: fadeInLeft,
//         imageUrl: imageUrl,
//         editMode: editMode,
//         itemIndex: itemIndex,
//       },
//       methods: {
//         updatedItem,
//       },
//     });

//     wrapper.setData({
//       updatedTitle: 'updated title',
//       updatedDescription: 'updated description',
//       updatedDate: new Date(),
//       updatedImageUrl: 'updatedImageUrl',
//     });

//     wrapper.vm.emitUpdatedItem();

//     expect(
//       updatedItem.calledOnceWith({
//         title: wrapper.vm.updatedTitle,
//         description: wrapper.vm.updatedDescription,
//         date: moment(wrapper.vm.updatedDate),
//         imageUrl: wrapper.vm.updatedImageUrl,
//       }),
//     ).to.be.true;
//   });
// });

// describe('#openImgUrlPicker', () => {
//   it('should set the correct value on component data', () => {
//     const wrapper = shallowMount(Item, {
//       propsData: {
//         title: title,
//         date: date,
//         description: description,
//         fadeInLeft: fadeInLeft,
//         imageUrl: imageUrl,
//         editMode: editMode,
//         itemIndex: itemIndex,
//       },
//     });

//     expect(wrapper.vm.showImgUrlPicker).to.be.false;

//     wrapper.vm.openImgUrlPicker();

//     expect(wrapper.vm.showImgUrlPicker).to.be.true;
//   });
// });

// describe('#deleteItem', () => {
//   it('should call the correct method', () => {
//     const deletedItem = sinon.spy();
//     const wrapper = shallowMount(Item, {
//       propsData: {
//         title: title,
//         date: date,
//         description: description,
//         fadeInLeft: fadeInLeft,
//         imageUrl: imageUrl,
//         editMode: editMode,
//         itemIndex: itemIndex,
//       },
//       methods: {
//         deletedItem,
//       },
//     });

//     wrapper.vm.deleteItem();

//     expect(deletedItem.calledOnceWith(itemIndex)).to.be.true;
//   });
// });

// describe('events', () => {
//   describe('#updatedItem', () => {
//     it('should emit the correct event', () => {
//       const wrapper = shallowMount(Item, {
//         propsData: {
//           title: title,
//           date: date,
//           description: description,
//           fadeInLeft: fadeInLeft,
//           imageUrl: imageUrl,
//           editMode: editMode,
//           itemIndex: itemIndex,
//         },
//       });
//       const now = moment();
//       const item = {
//         internalId: '1',
//         title: 'title',
//         description: 'description',
//         date: now,
//         imageUrl: 'imageUrl',
//       };

//       wrapper.vm.updatedItem(item);

//       expect(wrapper.emitted('updated-item')).to.have.lengthOf(1);
//       expect(wrapper.emitted('updated-item')[0]).to.deep.equal([item]);
//     });
//   });

//   describe('#deletedItem', () => {
//     it('should emit the correct event', () => {
//       const wrapper = shallowMount(Item, {
//         propsData: {
//           title: title,
//           date: date,
//           description: description,
//           fadeInLeft: fadeInLeft,
//           imageUrl: imageUrl,
//           editMode: editMode,
//           itemIndex: itemIndex,
//         },
//       });
//       const index = 0;
//       wrapper.vm.deletedItem(index);

//       expect(wrapper.emitted('deleted-item')).to.have.lengthOf(1);
//       expect(wrapper.emitted('deleted-item')[0]).to.deep.equal([index]);
//     });
//   });
// });
// });
