'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [lang, setLang] = useState('fa');

  const t = {
    fa: {
      pumpRadar: 'رادار پامپ',
      priceFloor: 'کف قیمتی',
      alerts: 'هشدارها',
      switchLang: 'تغییر زبان به انگلیسی',
      subtitle: 'سیگنال توکن‌های DEX/CEX'
    },
    en: {
      pumpRadar: 'Pump Radar',
      priceFloor: 'Price Floor',
      alerts: 'Alerts',
      switchLang: 'Switch to Persian',
      subtitle: 'DEX/CEX token signals'
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/icons/icon-192.png',
      });
    }
  };

  useEffect(() => {
    // نمونه تستی از شرط پامپ
    const fakePumpSignal = {
      token: 'XYZ',
      rsi: 32,
      volume: 4.5,
    };

    if (fakePumpSignal.rsi < 35 && fakePumpSignal.volume > 2) {
      sendNotification("🚨 Pump Alert!", `Token ${fakePumpSignal.token} may pump soon!`);
    }
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'fa' ? 'en' : 'fa');
  };

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">PumpSniper</h1>
        <button onClick={toggleLang} className="bg-indigo-600 px-4 py-2 rounded-xl">
          {t[lang].switchLang}
        </button>
      </div>

      <div className="grid gap-4">
        <div className="bg-gray-800 p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">{t[lang].pumpRadar}</h2>
          <p className="text-sm opacity-70">{t[lang].subtitle}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">{t[lang].priceFloor}</h2>
          <p className="text-sm opacity-70">Coins near bottom</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">{t[lang].alerts}</h2>
          <p className="text-sm opacity-70">Pump alerts & notifications</p>
        </div>
      </div>
    </main>
  );
}