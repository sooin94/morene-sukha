
import { useState, useEffect } from 'react';
import {
  getVapidPublicKey,
  savePushSubscription,
  sendTestNotification
} from '../api/pushApi';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);

  return Uint8Array.from(rawData, char => char.charCodeAt(0));
}

export default function EnableNotification() {
  const [status, setStatus] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
useEffect(() => {
  const checkSubscription = async () => {
    try {
      if (
        !('serviceWorker' in navigator) ||
        !('PushManager' in window) ||
        !('Notification' in window)
      ) {
        return;
      }

      const registration =
        await navigator.serviceWorker.getRegistration('/sw.js');

      if (!registration) return;

      const subscription =
        await registration.pushManager.getSubscription();

      if (subscription && Notification.permission === 'granted') {
        setEnabled(true);
        setStatus('Notifications already enabled!');
      }
    } catch (error) {
      console.error('Subscription check failed:', error);
    }
  };

  checkSubscription();
}, []);
  const enableNotifications = async () => {
    setLoading(true);

    try {
      if (
        !('serviceWorker' in navigator) ||
        !('PushManager' in window) ||
        !('Notification' in window)
      ) {
        throw new Error('Push notifications are not supported');
      }

      // 버튼 클릭 직후 권한 요청
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        throw new Error('Notification permission was not granted');
      }

      // Service Worker 등록
      const registration = await navigator.serviceWorker.register('/sw.js');

      // 서버의 VAPID 공개키
      const publicKey = await getVapidPublicKey();

      // 브라우저 푸시 구독 생성
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey)
        });
      }

      // MongoDB에 구독 정보 저장
      await savePushSubscription(subscription);

      setEnabled(true);
      setStatus('Notifications enabled!');
    } catch (error) {
      console.error(error);
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

const testNotification = async () => {
  try {
    setStatus('Sending test notification...');

    const result = await sendTestNotification();

    setStatus(
      `Total: ${result.total}, Sent: ${result.sent}, Failed: ${result.failed}`
    );
  } catch (error) {
    console.error('Test notification error:', error);

    setStatus(
      error.response?.data?.message || error.message
    );
  }
};

  return (
    <div>
      <h3>Order Notifications</h3>

      <button onClick={enableNotifications} disabled={loading}>
        {loading ? 'Enabling...' : 'Enable Notifications'}
      </button>

      <button onClick={testNotification} disabled={!enabled}>
        Send Test Notification
      </button>

      <p>{status}</p>
    </div>
  );
}
