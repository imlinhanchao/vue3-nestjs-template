<script setup lang="ts">
  import { Config, initConfig } from '@/api/config';
  import { FormInstance, FormRules } from 'element-plus';
  import Logo from '@/layouts/components/logo/index.vue';
  import { useTitle } from '@/hooks/web/useTitle';
  import { useConfig } from './config';
  import { randStr } from '@/utils';

  const formData = reactive<Config & { password?: string; email?: string }>(new Config());
  const formRef = ref<FormInstance>();
  const loading = ref(false);
  const rules: FormRules = {
    'database.host': [
      {
        required: true,
        message: '请输入数据库地址',
        trigger: 'blur',
      },
      {
        validator: (_, __, cb) => {
          if (!formData.database.port) {
            return cb(new Error('请输入数据库端口号'));
          }
          return cb();
        },
      },
    ],
    'database.database': [
      {
        required: true,
        message: '请输入数据库名',
        trigger: 'blur',
      },
    ],
    'database.username': [
      {
        required: true,
        message: '请输入登录名',
        trigger: 'blur',
      },
    ],
    'database.password': [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
    ],
    salt: [
      {
        required: true,
        message: '请输入数据盐',
        trigger: 'change',
      },
    ],
    'jwtConstants.secret': [
      {
        required: true,
        message: '请输入JWT Secret',
        trigger: 'change',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入管理员密码',
        trigger: 'change',
      },
    ],
    email: [
      {
        required: true,
        message: '请输入管理员邮箱',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: '请输入正确的邮箱格式',
        trigger: 'blur',
      },
    ],
  };

  const isConfiged = ref(false);
  async function save() {
    await formRef.value?.validate();
    loading.value = true;
    await initConfig(formData);

    isConfiged.value = true;
    const { waitServer } = useConfig();
    await waitServer;

    setTimeout(() => reload(), 1000);
  }

  function reload() {
    location.reload();
  }

  onMounted(() => {
    useTitle().setTitle('系统配置');
  });
</script>

<template>
  <el-container class="flex items-center justify-center h-full w-full">
    <el-card>
      <template #header>
        <h2 class="text-center"><Logo /></h2>
      </template>
      <el-form
        v-if="!isConfiged"
        ref="formRef"
        :model="formData"
        :rules="rules"
        class="max-w-120 grid grid-cols-2 gap-x-2"
      >
        <el-divider class="col-span-2">数据库配置</el-divider>
        <el-form-item :name="['database', 'host']" :rules="rules['database.host']">
          <section class="flex">
            <el-input
              v-model="formData.database.host"
              placeholder="数据库地址"
              allow-clear
              style="width: 65%"
            >
              <template #prefix>
                <Icon icon="i-mdi:network" title="数据库地址" />
              </template>
            </el-input>
        
            <el-input
              type="number"
              v-model="formData.database.port"
              placeholder="端口"
              style="width: 35%"
            >
              <template #prefix> : </template>
            </el-input>
          </section>
        </el-form-item>
        <el-form-item :name="['database', 'database']" :rules="rules['database.database']">
          <el-input v-model="formData.database.database" placeholder="数据库名" allow-clear>
            <template #prefix>
              <Icon icon="i-mdi:database" title="数据库名" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :name="['database', 'username']" :rules="rules['database.username']">
          <el-input v-model="formData.database.username" placeholder="登录名" allow-clear>
            <template #prefix>
              <Icon icon="i-mdi:user" title="数据库登录名" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :name="['database', 'password']" :rules="rules['database.password']">
          <el-input type="password" v-model="formData.database.password" placeholder="密码" allow-clear>
            <template #prefix>
              <Icon icon="i-bxs:lock-alt" title="数据库密码" />
            </template>
          </el-input>
        </el-form-item>
        <el-divider class="col-span-2">安全配置</el-divider>
        <el-form-item name="salt">
          <el-input v-model="formData.salt" placeholder="数据盐" allow-clear>
            <template #prefix>
              <Icon icon="i-tabler:salt" title="数据加密盐" />
            </template>
            <template #suffix>
              <Icon
                icon="i-ri:dice-fill"
                class="cursor-pointer"
                title="随机生成"
                @click="formData.salt = randStr()"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :name="['jwtConstants', 'secret']" :rules="rules['jwtConstants.secret']">
          <el-input v-model="formData.jwtConstants.secret" placeholder="JWT Secret" allow-clear>
            <template #prefix>
              <Icon icon="i-fel-solid:user-secret" title="JWT Secret" />
            </template>
            <template #suffix>
              <Icon
                icon="i-ri:dice-fill"
                class="cursor-pointer"
                title="随机生成"
                @click="formData.jwtConstants.secret = randStr()"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-divider class="col-span-2">管理员配置</el-divider>
        <el-form-item name="password">
          <el-input type="password" v-model="formData.password" placeholder="管理员密码" allow-clear>
            <template #prefix>
              <Icon icon="i-bxs:lock-alt" title="管理员密码" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item name="email">
          <el-input v-model="formData.email" placeholder="管理员邮箱" allow-clear>
            <template #prefix>
              <Icon icon="i-tabler:mail-filled" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="col-span-2">
          <section class="flex justify-center w-full">
            <el-button block type="primary" @click="save" :loading="loading">保存</el-button>
          </section>
        </el-form-item>
      </el-form>
      <el-result v-else status="success" title="配置成功，请重启后端服务">
        <template #extra>
          <el-button type="primary" @click="reload">刷新登录</el-button>
        </template>
      </el-result>
    </el-card>
  </el-container>
</template>
<style lang="less" scoped>
  .ant-divider {
    margin-top: 0;
  }
</style>
