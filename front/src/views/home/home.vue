<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user';

  const {getUserInfo: userInfo} = useUserStore();
  onMounted(() => {
  })
</script>

<template>
  <article>
    <main>
      Welcome {{ userInfo.nickname }}.
    </main>
  </article>
</template>
