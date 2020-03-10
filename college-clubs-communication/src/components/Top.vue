<template>
  <div class="top">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 90px;
  border-bottom: 1px solid #ccc;
  font-size: 42px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 9999
}
</style>