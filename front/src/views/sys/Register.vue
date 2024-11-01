<script lang="ts" setup>
  import { PageEnum } from '@/enums/pageEnum';
  import { useUserStore } from '@/store/modules/user';
  import { ElNotification } from 'element-plus';
  import { FormInstance, FormRules } from 'element-plus';
  import Logo from '@/layouts/components/logo/index.vue';
  import { registerAccount, RegisterParams } from '@/api/user';

  const formData = reactive<RegisterParams>({
    username: '',
    nickname: '',
    password: '',
    email: '',
  });

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
    nickname: [
      {
        required: true,
        message: '请输入昵称',
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
    email: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: '请输入正确的邮箱格式',
        trigger: 'blur',
      },
    ],
  };
  const userStore = useUserStore();
  const router = useRouter();
  async function register() {
    await formRef.value?.validate();
    loading.value = true;
    await registerAccount({
      ...formData,
    }).finally(() => (loading.value = false));
    const userInfo = await userStore.login({
      ...formData,
    });
    if (!userInfo) return;
    ElNotification.success({
      title: '注册成功',
      message: `欢迎您: ${userInfo.nickname || userInfo.username}`,
      duration: 3,
    });
    setTimeout(() => router.replace(PageEnum.BASE_HOME), 1000);
  }
</script>
<template>
  <el-container class="flex items-center justify-center h-full w-full">
    <el-card>
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
        <el-form-item name="nickname">
          <el-input
            v-model="formData.nickname"
            placeholder="昵称"
            allow-clear
            class="max-w-80"
          >
            <template #prefix>
              <Icon icon="i-ph:star-fill" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
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
        <el-form-item name="email">
          <el-input
            v-model="formData.email"
            placeholder="邮箱"
            allow-clear
            class="max-w-80"
            type="email"
          >
            <template #prefix>
              <Icon icon="i-tabler:mail-filled" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <section class="flex justify-between w-full">
            <el-button type="primary" @click="register" :loading="loading">注册</el-button>
            <el-button @click="router.push('/login')" :loading="loading">登录</el-button>
          </section>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>
