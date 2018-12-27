<template>
  <b-modal
    id="createConversationModal"
    ref="modal"
    centered
    @shown="onModalOpen"
    @ok="createNewConversation"
    title="Create a new conversation"
  >
    <div class="text-danger" v-if="error">{{ error }}</div>

    <vue-tags-input
      ref="recipientsInput"
      placeholder="Add at least one recipient"
      v-model="currentRecipient"
      :autocomplete-items="formattedAutocompleteItems"
      :add-only-from-autocomplete="true"
      @tags-changed="newTags => recipientsUpdated(newTags)"
    >
      <div
        slot="autocompleteItem"
        class="my-item"
        slot-scope="props"
        @click="props.performAdd(props.item)"
      >
        <i>{{ `(${props.item.firstName} ${props.item.lastName})` }}</i>
        {{ props.item.text }}
      </div>
    </vue-tags-input>

    <div class="message-container">
      <b-form-textarea
        id="message"
        v-model="currentMessage"
        placeholder="Write your message"
        :rows="3"
        :max-rows="6"
      ></b-form-textarea>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import VueTagsInput from '@johmun/vue-tags-input';
import map from 'lodash/map';
import debounce from 'lodash/debounce';
import ApiInterface from '@/services/api-interface.ts';

const meInboxNamespace: string = 'meInboxState';

@Component({
  components: {
    VueTagsInput,
  },
})
export default class CreateConversationModal extends Vue {
  @Action('createConversation', { namespace: meInboxNamespace })
  public createConversation!: (
    params: { recipients: string[]; message: string },
  ) => Promise<any>;

  public currentRecipient: string = '';
  public recipients: string[] = [];
  public currentMessage: string = '';
  public error = '';
  public autocompleteItems = [];
  public apiInterface: ApiInterface = new ApiInterface();

  // tslint:disable-next-line:no-empty
  public debouncedSearchUsers: () => any = () => {};

  @Watch('currentRecipient')
  public onRecipientChanged(val: string, oldVal: string) {
    this.debouncedSearchUsers();
  }

  public created() {
    this.debouncedSearchUsers = debounce(() => {
      this.searchUsers();
    }, 350);
  }

  public recipientsUpdated(
    recipients: Array<{ text: string; tiClasses: string[] }>,
  ) {
    this.recipients = map(recipients, (recipient) => recipient.text);
  }

  public onModalOpen() {
    console.log('OK');
    this.recipients = [];
    this.error = '';
  }

  public createNewConversation(event: any) {
    event.preventDefault();
    this.error = '';

    if (this.recipients.length === 0) {
      this.error = 'Please enter at least one recipient';
      return;
    }

    if (this.currentMessage.length === 0) {
      this.error = 'Please enter a message';
      return;
    }

    this.createConversation({
      recipients: this.recipients,
      message: this.currentMessage,
    })
      .then((response) => {
        (this.$refs.modal as any).hide();
      })
      .catch((error) => {
        this.error = error.response.data.errors.join(', ');
      });
    
  }

  public searchUsers(): void {
    if (this.currentRecipient) {
      this.apiInterface
      .searchUsers(this.currentRecipient)
      .then((response: any) => {
        this.autocompleteItems = response.data.results;
      });
    }
  }

  get formattedAutocompleteItems() {
    return map(this.autocompleteItems, (item: any) => {
      return {
        text: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
      };
    });
  }
}
</script>

<style lang="scss" scoped>
</style>