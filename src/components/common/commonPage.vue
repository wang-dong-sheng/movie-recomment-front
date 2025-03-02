<template>
<div>
  <my-menu class="myMenu"></my-menu>
  <router-view></router-view>
</div>
</template>

<script>
import menu from './menu';

export default {
  components: {
    'my-menu': menu,
  },
  computed: {
    isAdmin() {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      return user && user.userRole === 'admin';
    }
  }
};
</script>
