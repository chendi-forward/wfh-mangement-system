<template>
  <div class="qxgl">
    <div class="header">
      <div class="header-title">{{title}}</div>
      <div class="add-btn">
        <el-button type="danger" @click="addUser">新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      height="430"
      stripe
      row-class-name='rowClassName'
      header-row-class-name='tableHeader'
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="100">
        <template>
            <span>******</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="role"
        label="操作权限">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="180">
        <template slot-scope="scope">
        <i class="el-icon-edit" @click="editUser(scope)"></i>
        &nbsp;
        <i class="el-icon-delete" @click='deleteUser(scope.row)'></i>
      </template>
      </el-table-column>
    </el-table>
    <dialog-Com width='420px' v-model='dialogFlag' :title='addtitle' @sure-save='sureSave' @cancle-save='cancleSave'>
      <div class="add-authority">
        <el-form ref="form" :rules="rules" :model="form" :label-position="labelPosition" label-width="90px">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="账号:" prop="account">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="角色权限:" prop="role">
            <el-checkbox-group v-model="form.role">
              <el-checkbox label="1" name="role">售后</el-checkbox>
              <el-checkbox label="2" name="role">会计</el-checkbox>
              <el-checkbox label="3" name="role">会员</el-checkbox>
              <el-checkbox label="4" name="role">内容</el-checkbox>
              <el-checkbox label="5" name="role">营销</el-checkbox>
              <el-checkbox label="6" name="role">数据库</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </dialog-Com>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.less" lang="less"></style>
