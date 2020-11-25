import notification from 'ant-design-vue/es/notification';

export const showErrors = (message) => {
  for (const key in message) {
    notification.error({
      message: message[key],
    });
  }
};

export const showError = (message) => {
  notification.error({
    message,
  });
};

export const showSuccess = (message) => {
  notification.success({
    message,
  });
};
