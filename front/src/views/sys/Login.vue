<script lang="ts" setup>
  import { PageEnum } from '@/enums/pageEnum';
  import { useUserStore } from '@/store/modules/user';
  import { ElNotification, FormInstance, FormRules } from 'element-plus';
  import Logo from '@/layouts/components/logo/index.vue';
  import Config from './Config.vue';
  import { isConfig } from '@/api/config';

  const formData = reactive({
    username: '',
    password: '',
  });

  const hasConfig = ref(true);
  isConfig().then((res) => (hasConfig.value = res));

  const formRef = ref<FormInstance>();
  const loading = ref(false);
  const rules: FormRules = {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
    ],
  };
  const userStore = useUserStore();
  const router = useRouter();
  async function login() {
    await formRef.value?.validate();
    console.log('formData: ', formData);
    loading.value = true;
    const userInfo = await userStore
      .login({
        ...formData,
      })
      .finally(() => (loading.value = false));
    if (userInfo) {
      ElNotification.success({
        title: '登录成功',
        message: `欢迎回来: ${userInfo.nickname || userInfo.username}`,
        duration: 3,
      });
      setTimeout(() => router.replace(PageEnum.BASE_HOME), 1000);
    }
  }
</script>
<template>
  <el-container class="flex items-center justify-center h-full w-full">
    <Config v-if="!hasConfig" />
    <el-card v-else>
      <template #header>
        <h2 class="text-center"><Logo /></h2>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules">
        <el-form-item name="username">
          <el-input
            v-model="formData.username"
            placeholder="用户名"
            allow-clear
            class="max-w-80"
          >
            <template #prefix>
              <Icon icon="i-mdi:user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item name="password">
          <el-input
            type="password"
            v-model="formData.password"
            placeholder="密码"
            allow-clear
            class="max-w-80"
          >
            <template #prefix>
              <Icon icon="i-bxs:lock-alt" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <section class="flex justify-between w-full">
            <el-button type="primary" @click="login" :loading="loading">登录</el-button>
            <el-button @click="router.push('/register')">注册</el-button>
          </section>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>
