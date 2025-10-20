import AppError from "@shared/errors/AppError";

export function normalizeDepartament(departament: string): string {
  if (!departament || typeof departament !== 'string') {
    throw new AppError('Invalid departament.');
  }

  const normalizedDepartament = departament
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9\s]/g, '') // remove caracteres especiais
    .replace(/\s+/g, ' '); // normaliza multiplos caracteres de espaço

  if(normalizedDepartament.length === 0){
    throw new AppError('Departament contains only invalid characters.');
  }

  if (normalizedDepartament.length < 2) {
    throw new AppError('Departament must be at least 2 characters long.');
  }

  return normalizedDepartament;
}