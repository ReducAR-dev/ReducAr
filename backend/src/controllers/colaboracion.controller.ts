// src/controllers/colaboracion.controller.ts
import type { Request, Response } from "express";
import { crearPreferenciaColaboracion } from "../services/colaboracion.service.js";
import type { CrearColaboracionPayload } from "../schema/colaboracion.schema.js";

// ============================================
// POST /api/colaboraciones
// ============================================

export const postColaboracionHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { monto } = req.body as CrearColaboracionPayload;

  const resultado = await crearPreferenciaColaboracion(monto);

  if (!resultado.success) {
    res.status(500).json({ success: false, error: resultado.error });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Preferencia de pago creada exitosamente.",
    data: resultado.data,
  });
};
