<template>
  <div>
    <div id="modal">
      <transition name="fade">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container warning">
              <div class="modal-content">
                <div class="modal-header">
                  <slot name="header"> </slot>
                </div>

                <div class="modal-body">
                  <slot name="body"> </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer"> </slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWarning',
};
</script>

<style lang="scss" scoped></style>
