<template>
  <div id="form" class="container">
    <div class="row">
        <div class="col s12">
          <div class="card">
            <div class="card-content white-text">
              <span class="card-title center teal-text"><slot name="title"></slot></span>
              <slot name="form"></slot>
            </div>
            <div class="card-action">
              <slot name="button"></slot>
            </div>
            <div class="col s12">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'home-form'
}
</script>

<style scope>
  #form{
    margin-top: 1em;
  }
</style>
