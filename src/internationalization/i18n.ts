import { createInstance, i18n } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nConfig } from './i18n.config';

export async function initTranslations(
  locale: string,
  namespaces: string | readonly string[] = ['common'],
  i18n?: i18n,
  resources?: any,
) {
  const i18nInstance = i18n || createInstance();

  const ns = Array.isArray(namespaces) ? namespaces : [namespaces];

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`),
      ),
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: ns[0],
    fallbackNS: ns[0],
    ns,
    preload: resources ? [] : i18nConfig.locales,
  });

  return i18nInstance;
}
