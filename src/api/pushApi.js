import axiosInstance from './axiosInstance';
const API_URL = '';

export async function getVapidPublicKey() {
    const response = await axiosInstance.get(
        '/api/push/public-key'
    );

    return response.data.publicKey;
}

export async function savePushSubscription(subscription) {
    const response = await axiosInstance.post(
        '/api/push/subscribe',
        subscription
    );

  return response.data;
}

export async function sendTestNotification() {
      const response = await axiosInstance.post(
        '/api/push/test'
    );
  return response.data;
}
