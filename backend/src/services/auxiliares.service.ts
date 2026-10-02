import { supabase } from '../config/supabase';
import {
  rol,
  modalidad,
  nivel,
  tipoCertificado,
  estadoCurso,
  estadoRuta,
  tipoReporte,
  estadoReporte,
  tipoAccion
} from '../models';

export class AuxiliaresService {
  // --- ROL ---
  async getRoles(): Promise<rol[]> {
    const { data, error } = await supabase.from('rol').select('*');
    if (error) throw new Error(`Error fetching roles: ${error.message}`);
    return data as rol[];
  }

  async getRoleById(id: number): Promise<rol | null> {
    const { data, error } = await supabase.from('rol').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching role by id: ${error.message}`);
    }
    return data as rol;
  }

  // --- MODALIDAD ---
  async getModalities(): Promise<modalidad[]> {
    const { data, error } = await supabase.from('modalidad').select('*');
    if (error) throw new Error(`Error fetching modalities: ${error.message}`);
    return data as modalidad[];
  }

  async getModalityById(id: number): Promise<modalidad | null> {
    const { data, error } = await supabase.from('modalidad').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching modality by id: ${error.message}`);
    }
    return data as modalidad;
  }

  // --- NIVEL ---
  async getLevels(): Promise<nivel[]> {
    const { data, error } = await supabase.from('nivel').select('*');
    if (error) throw new Error(`Error fetching levels: ${error.message}`);
    return data as nivel[];
  }

  async getLevelById(id: number): Promise<nivel | null> {
    const { data, error } = await supabase.from('nivel').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching level by id: ${error.message}`);
    }
    return data as nivel;
  }

  // --- TIPO CERTIFICADO ---
  async getCertificateTypes(): Promise<tipoCertificado[]> {
    const { data, error } = await supabase.from('tipoCertificado').select('*');
    if (error) throw new Error(`Error fetching certificate types: ${error.message}`);
    return data as tipoCertificado[];
  }

  async getCertificateTypeById(id: number): Promise<tipoCertificado | null> {
    const { data, error } = await supabase.from('tipoCertificado').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching certificate type by id: ${error.message}`);
    }
    return data as tipoCertificado;
  }

  // --- ESTADO CURSO ---
  async getCourseStates(): Promise<estadoCurso[]> {
    const { data, error } = await supabase.from('estadoCurso').select('*');
    if (error) throw new Error(`Error fetching course states: ${error.message}`);
    return data as estadoCurso[];
  }

  async getCourseStateById(id: number): Promise<estadoCurso | null> {
    const { data, error } = await supabase.from('estadoCurso').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching course state by id: ${error.message}`);
    }
    return data as estadoCurso;
  }

  // --- ESTADO RUTA ---
  async getRouteStates(): Promise<estadoRuta[]> {
    const { data, error } = await supabase.from('estadoRuta').select('*');
    if (error) throw new Error(`Error fetching route states: ${error.message}`);
    return data as estadoRuta[];
  }

  async getRouteStateById(id: number): Promise<estadoRuta | null> {
    const { data, error } = await supabase.from('estadoRuta').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching route state by id: ${error.message}`);
    }
    return data as estadoRuta;
  }

  // --- TIPO REPORTE ---
  async getReportTypes(): Promise<tipoReporte[]> {
    const { data, error } = await supabase.from('tipoReporte').select('*');
    if (error) throw new Error(`Error fetching report types: ${error.message}`);
    return data as tipoReporte[];
  }

  async getReportTypeById(id: number): Promise<tipoReporte | null> {
    const { data, error } = await supabase.from('tipoReporte').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching report type by id: ${error.message}`);
    }
    return data as tipoReporte;
  }

  // --- ESTADO REPORTE ---
  async getReportStates(): Promise<estadoReporte[]> {
    const { data, error } = await supabase.from('estadoReporte').select('*');
    if (error) throw new Error(`Error fetching report states: ${error.message}`);
    return data as estadoReporte[];
  }

  async getReportStateById(id: number): Promise<estadoReporte | null> {
    const { data, error } = await supabase.from('estadoReporte').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching report state by id: ${error.message}`);
    }
    return data as estadoReporte;
  }

  // --- TIPO ACCION ---
  async getActionTypes(): Promise<tipoAccion[]> {
    const { data, error } = await supabase.from('tipoAccion').select('*');
    if (error) throw new Error(`Error fetching action types: ${error.message}`);
    return data as tipoAccion[];
  }

  async getActionTypeById(id: number): Promise<tipoAccion | null> {
    const { data, error } = await supabase.from('tipoAccion').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching action type by id: ${error.message}`);
    }
    return data as tipoAccion;
  }
}

export const auxiliaresService = new AuxiliaresService();
