'use client';

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/config';

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    let messages;
    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    if (!locales.includes(locale as any)) {
        notFound();
    }

    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="UTC" // Add this line
        >
            {children}
        </NextIntlClientProvider>
    );
}