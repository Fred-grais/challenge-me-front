<template>
  <div class="register">
    <section class="mbr-section content5 cid-r3amUe0ElS mbr-parallax-background" id="content5-t">

        <div class="container">
            <div class="media-container-row">
                <div class="title col-12 col-md-8">
                    <h2 class="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-1">Register</h2>
                </div>
            </div>
        </div>
    </section>
    <br/>
    <br/>
    <div class="errors">
      <div class="error" v-for="error in errors" :key="error">
        {{error}}
      </div>
    </div>

    <section class="cid-r3ansR389K mbr" id="header15-u">

        <div class="container align-right">
          <div class="row">
            <div class="mbr-white col-lg-4 col-md-3 content-container"></div>
            <div class="col-lg-4 col-md-5">
              <div class="form-container">
                  <div class="media-container-column" data-form-type="formoid">

                      <form class="mbr-form">

                          <div data-for="email">
                              <div class="form-group">
                                  <input type="email" class="form-control px-3 email-input" v-model="email" placeholder="email" name="email" data-form-field="email" required="" id="email-header15-u">
                              </div>
                          </div>
                          <div data-for="password">
                              <div class="form-group">
                                  <input type="password" class="form-control px-3" v-model="password" placeholder="password" name="password" data-form-field="password" required="" id="password-header15-u">
                              </div>
                          </div>

                          <span class="input-group-btn">
                              <button type="button" class="btn btn-secondary btn-form display-4 submit-button register-button" @click="signUp()">Sign up</button>
                              <!-- <button href="" type="submit" class="btn btn-secondary btn-form display-4">SEND FORM</button> -->
                          </span>
                      </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    <br/>
    <br/>
    <!-- <form>
      <input type="email" placeholder="email" v-model="email" />
      <br/>
      <input type="password" placeholder="password"  v-model="password" />
      <br/>
      <button class="register-button" type="button" @click="signUp()">Sign up</button>

    </form> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Form extends Vue {
  public email: string = '';
  public password: string = '';

  public errors: string[] = [];

  public onRegisterError(res: any): void {
    if (res.response) {
      if (res.response.status === 422) {
        const errors = res.response.data.errors;
        if (errors) {
          this.errors = errors.full_messages;
        }
      } else if (res.response.status === 500) {
        this.errors.push('Cannot process your request right now, please try again later.');
      } else {
        this.errors.push('An unexpected error happened, please try again later.');
      }
    } else {
      this.errors.push('The server seems unresponsive, please try again later.');
    }
  }

  private signUp(): void {
    this.errors = [];

    this.$auth.register({
      params: {
        email: this.email,
        password: this.password,
      }, // data: {} in Axios
      // tslint:disable-next-line:no-empty
      success() {},
      error: this.onRegisterError,
      autoLogin: true,
      rememberMe: true,
      redirect: {name: 'me'},
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
