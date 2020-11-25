<template>
  <div class="footer">
    <div class="links">
      <a href="https://github.com/mooxun/emgo-admin" target="_blank">Emgo Admin</a>
      <a href="https://github.com/mooxun/emgo-admin" target="_blank">关于我们</a>
      <a href="https://github.com/mooxun/emgo-admin" target="_blank">联系我们</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright"/>
      2020 <span>Emgo Admin</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GlobalFooter',
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }

  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
