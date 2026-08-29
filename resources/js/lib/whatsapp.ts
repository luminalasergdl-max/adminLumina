export function normalizeWhatsAppPhone(phone?: string | null): string | null {
    const digits = phone?.replace(/\D/g, '') ?? '';

    if (!digits) {
        return null;
    }

    if (digits.length === 10) {
        return `52${digits}`;
    }

    if (/^521\d{10}$/.test(digits)) {
        return `52${digits.slice(3)}`;
    }

    return digits;
}

export function getWhatsAppUrl(phone?: string | null, message?: string): string | null {
    const normalizedPhone = normalizeWhatsAppPhone(phone);

    if (!normalizedPhone) {
        return null;
    }

    const url = `https://wa.me/${normalizedPhone}`;

    return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
