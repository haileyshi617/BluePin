<template>
  <div>
    <Layout
      :showFooter="showFooter"
      :footerType="footerType"
      :sessionUserID="sessionUserID"
      :showLostGuide="showLostGuide"
    >
      <AuthForm />
    </Layout>
  </div>
</template>

<script>
import Layout from '../components/layout/Layout.vue';
import AuthForm from '../components/user/AuthForm.vue';

export default {
  name: 'Signup',
  props: ['sessionUserID'],
  components: {
    Layout,
    AuthForm,
  },
  data() {
    return {
      showFooter: 'show',
      footerType: 'light',
      showLostGuide: false,
    };
  },
};
</script>
<style lang="scss" scoped></style>
