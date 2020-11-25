import { showSuccess, showError, showErrors } from '@/utils/showMsg';
import FormMixin from '@/mixins/form';

const $em = {
  showSuccess,
  showError,
  showErrors,
};

const install = (Vue) => {
  Vue.mixin(FormMixin);

  Vue.prototype.$em = $em;
};

export default {
  install,
};
