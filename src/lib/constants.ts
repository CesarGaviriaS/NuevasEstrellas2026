/**
 * Official contact information and WhatsApp URL helpers
 */

export const OFFICIAL_PHONE_DISPLAY = "300 212 5586";
export const OFFICIAL_PHONE_RAW = "573002125586";
export const OFFICIAL_EMAIL = "director@nuevasestrellas.com";

export const OFFICIAL_WHATSAPP_MESSAGE = "Hola deseo tener mas información sobre el torneo Nuevas estrellas electrolit 2026 en Yopal";

export const OFFICIAL_WHATSAPP_URL = `https://wa.me/${OFFICIAL_PHONE_RAW}?text=${encodeURIComponent(OFFICIAL_WHATSAPP_MESSAGE)}`;

export function getWhatsAppUrl(message: string = OFFICIAL_WHATSAPP_MESSAGE): string {
    return `https://wa.me/${OFFICIAL_PHONE_RAW}?text=${encodeURIComponent(message)}`;
}
