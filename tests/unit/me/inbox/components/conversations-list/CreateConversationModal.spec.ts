import { expect } from 'chai';
import Vuex from 'vuex';

import CreateConversationModal from '@/components/me/inbox/components/conversations-list/CreateConversationModal.vue';

import { shallowMount, createLocalVue, mount } from '@vue/test-utils';

import sinon from 'sinon';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
describe('me/inbox/components/conversations-list/ConversationCard', () => {

    let actions: any;
    let store: any;

    beforeEach(() => {

        actions = {
            createConversation: sinon.stub(),
        };

        store = new Vuex.Store({
            modules: {
                meInboxState: {
                    namespaced: true,
                    actions,
                },
            },
        });
    });

    it('should call the right method when the currentRecipient changed', (done) => {
        const searchUsersStub = sinon.stub();
        // Need to use the global of jsdom for the fakeTimers to function properly with lodash's debounce
        const clock = (sinon as any).useFakeTimers({ global });

        const wrapper = shallowMount(CreateConversationModal, {
            localVue,
            store,
        });
        const autocompleteUsers = [
            { email: 'email', firstName: 'firstName', lastName: 'lastName' },
            { email: 'email2', firstName: 'firstName2', lastName: 'lastName2' },
        ];
        wrapper.vm.apiInterface.searchUsers = searchUsersStub;

        searchUsersStub.resolves(
            {
                data: {
                    results: autocompleteUsers,
                },
            },
        );

        wrapper.setData({ currentRecipient: 'newRecipient' });

        wrapper.vm.$nextTick(() => {
            clock.tick(100);
            expect(searchUsersStub.called).to.be.false;
            clock.tick(100);
            expect(searchUsersStub.called).to.be.false;
            clock.tick(151);
            expect(searchUsersStub.calledOnceWith('newRecipient')).to.be.true;

            wrapper.vm.$nextTick(() => {
                expect(wrapper.vm.autocompleteItems).to.deep.equal(autocompleteUsers);
                clock.restore();
                done();
            });

        });
    });

    context('recipientsUpdated', () => {
        it('should return the correct recipients', () => {

            const wrapper = shallowMount(CreateConversationModal, {
                localVue,
                store,
            });

            const recipients = [{ text: 'recipient1', tiClasses: [] }, { text: 'recipient2', tiClasses: [] }];
            wrapper.vm.recipientsUpdated(recipients);
            expect(wrapper.vm.recipients).to.deep.equal(['recipient1', 'recipient2']);
        });
    });

    context('onModalOpen', () => {
        it('should reset the correct variables', () => {
            const wrapper = shallowMount(CreateConversationModal, {
                localVue,
                store,
            });

            wrapper.setData({
                recipients: [1, 2],
                error: 'error',
            });

            wrapper.vm.onModalOpen();

            expect(wrapper.vm.recipients).to.deep.equal([]);
            expect(wrapper.vm.error).to.equal('');
        });
    });

    context('createNewConversation', () => {
        const myEvent = { preventDefault() { } };

        context('No recipients', () => {
            it('should populate the error message', () => {
                const wrapper = shallowMount(CreateConversationModal, {
                    localVue,
                    store,
                });

                wrapper.setData({
                    recipients: [],
                });

                wrapper.vm.createNewConversation(myEvent);

                expect(wrapper.vm.error).to.equal('Please enter at least one recipient');
            });
        });

        context('No message', () => {
            it('should populate the error message', () => {
                const wrapper = shallowMount(CreateConversationModal, {
                    localVue,
                    store,
                });

                wrapper.setData({
                    recipients: ['recipient'],
                    currentMessage: '',
                });

                wrapper.vm.createNewConversation(myEvent);

                expect(wrapper.vm.error).to.equal('Please enter a message');
            });
        });

        context('Conversation already exists', () => {
            it('should populate the error message', (done) => {
                const wrapper = shallowMount(CreateConversationModal, {
                    localVue,
                    store,
                });

                wrapper.setData({
                    recipients: ['recipient'],
                    currentMessage: 'message',
                });

                actions.createConversation.rejects({
                    response: {
                        data: {
                            errors: ['error1', 'error2'],
                        },
                    },
                });

                wrapper.vm.createNewConversation(myEvent);

                // Need to call nextTick twice when checking a catch clause if there is a then clause before
                wrapper.vm.$nextTick(() => {
                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.error).to.equal('error1, error2');
                        done();
                    });
                });

            });
        });

        context('Conversation created', () => {
            it('should close the modal', (done) => {
                const wrapper = shallowMount(CreateConversationModal, {
                    localVue,
                    store,
                });

                wrapper.setData({
                    recipients: ['recipient'],
                    currentMessage: 'message',
                });

                actions.createConversation.resolves();
                const hideStub = sinon.stub();
                (wrapper.vm.$refs.modal as any).hide = hideStub;

                wrapper.vm.createNewConversation(myEvent);

                wrapper.vm.$nextTick(() => {
                    expect(hideStub.calledOnce).to.be.true;
                    done();
                });
            });
        });
    });

    context('formattedAutocompleteItems', () => {

        it('should format the autocomplete items', () => {
            const wrapper = shallowMount(CreateConversationModal, {
                localVue,
                store,
            });

            const autocompleteItems = [
                { email: 'email', firstName: 'firstName', lastName: 'lastName' },
                { email: 'email2', firstName: 'firstName2', lastName: 'lastName2' },
            ];
            wrapper.setData({
                autocompleteItems,
            });


            expect(wrapper.vm.formattedAutocompleteItems).to.deep.equal([
                { text: 'email', firstName: 'firstName', lastName: 'lastName' },
                { text: 'email2', firstName: 'firstName2', lastName: 'lastName2' },
            ]);

        });
    });

    context('modal', () => {

        context('on opening', () => {
            it('should call the onModalOpen method', () => {
                const onModalOpen = sinon.stub();

                const wrapper = mount(CreateConversationModal, {
                    localVue,
                    store,
                    methods: {
                        onModalOpen,
                    },
                });

                (wrapper.vm.$refs.modal as any).$emit('shown');
                expect(onModalOpen.called).to.be.true;

            });

        });

        context('on validation', () => {
            it('should call the createNewConversation method', () => {
                const createNewConversation = sinon.stub();

                const wrapper = mount(CreateConversationModal, {
                    localVue,
                    store,
                    methods: {
                        createNewConversation,
                    },
                });

                (wrapper.vm.$refs.modal as any).$emit('ok');
                expect(createNewConversation.called).to.be.true;

            });

        });
    });

    context('recipients input', () => {
        context('recipients changed', () => {

            it('should call the correct method', () => {

                const recipientsUpdated = sinon.stub();

                const wrapper = mount(CreateConversationModal, {
                    localVue,
                    store,
                    methods: {
                        recipientsUpdated,
                    },
                });
                const recipients = [{ text: 'recipient1' }, { text: 'recipient2' }, { text: 'recipient3' }];
                (wrapper.vm.$refs.recipientsInput as any).$emit('tags-changed', recipients);

                expect(recipientsUpdated.calledOnce).to.be.true;
                expect(recipientsUpdated.getCall(0).args[0]).to.deep.equal(recipients);
            });
        });

    });

    context('write in text area', () => {
        it('should populate the currentMessage data', () => {
            const wrapper = mount(CreateConversationModal, {
                localVue,
                store,
            });

            wrapper.find('#message').setValue('Message');
            expect(wrapper.vm.currentMessage).to.equal('Message');
        });

    });

});
