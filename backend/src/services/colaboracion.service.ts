// src/services/colaboracion.service.ts
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";
import type { Result } from "../types/common.types.js";

dotenv.config();

export interface PreferenciaRespuesta {
  id: string;
  init_point: string;
  sandbox_init_point: string | null;
}

/**
 * Crea una preferencia de pago en Mercado Pago (Checkout Pro)
 * para un aporte voluntario de apoyo a ReducAR.
 */
export const crearPreferenciaColaboracion = async (
  monto: number,
): Promise<Result<PreferenciaRespuesta>> => {
  const mpAccessToken = process.env.MP_ACCESS_TOKEN?.trim();

  if (!mpAccessToken) {
    return {
      success: false,
      error: "La pasarela de Mercado Pago no está configurada en el servidor.",
    };
  }

  try {
    const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
    const preference = new Preference(client);

    const frontendUrl =
      (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
        .split(",")[0]
        ?.trim() || "http://localhost:5173";

    const isHttps = frontendUrl.startsWith("https://");

    const response = await preference.create({
      body: {
        items: [
          {
            id: "aporte-reducar",
            title: "Aporte voluntario para apoyar el proyecto ReducAR",
            quantity: 1,
            unit_price: monto,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: `${frontendUrl}/nosotros?aporte=exito`,
          failure: `${frontendUrl}/nosotros?aporte=error`,
          pending: `${frontendUrl}/nosotros?aporte=pendiente`,
        },
        // Mercado Pago solo acepta auto_return cuando la URL es HTTPS pública (no localhost)
        ...(isHttps ? { auto_return: "approved" as const } : {}),
      },
    });

    if (!response.id || !response.init_point) {
      return {
        success: false,
        error: "No se pudo generar el enlace de pago.",
      };
    }

    return {
      success: true,
      data: {
        id: response.id,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point ?? null,
      },
    };
  } catch (err: any) {
    const mensaje =
      err?.message ||
      (typeof err === "object" ? JSON.stringify(err) : String(err));
    console.error("❌ colaboracion.crearPreferenciaColaboracion:", mensaje);
    return {
      success: false,
      error: "Error al comunicarse con Mercado Pago.",
    };
  }
};
