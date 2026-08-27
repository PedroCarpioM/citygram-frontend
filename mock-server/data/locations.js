export const countries = [{ id: 'c-bo', name: 'Bolivia' }]

export const provinces = [
  { id: 'p-cbba', name: 'Cochabamba', countryId: 'c-bo' },
  { id: 'p-lpz', name: 'La Paz', countryId: 'c-bo' },
  { id: 'p-scz', name: 'Santa Cruz', countryId: 'c-bo' },
]

export const cities = [
  { id: 'ci-cercado', name: 'Cercado', provinceId: 'p-cbba' },
  { id: 'ci-quillacollo', name: 'Quillacollo', provinceId: 'p-cbba' },
  { id: 'ci-lapaz', name: 'La Paz', provinceId: 'p-lpz' },
  { id: 'ci-santacruz', name: 'Santa Cruz de la Sierra', provinceId: 'p-scz' },
]

export const neighborhoods = [
  { id: 'n-queru', name: 'Queru Queru', cityId: 'ci-cercado' },
  { id: 'n-muyurina', name: 'Muyurina', cityId: 'ci-cercado' },
  { id: 'n-tupuraya', name: 'Tupuraya', cityId: 'ci-cercado' },
  { id: 'n-sancta-cruz', name: 'Equipetrol', cityId: 'ci-santacruz' },
]

export const propertyTypes = [
  { id: 't-casa', name: 'Casa' },
  { id: 't-departamento', name: 'Departamento' },
  { id: 't-lote', name: 'Lote' },
  { id: 't-oficina', name: 'Oficina' },
]

export const externalFeatures = [
  { id: 'ef-piscina', name: 'Piscina' },
  { id: 'ef-parqueo', name: 'Parqueo de visitas' },
  { id: 'ef-seguridad', name: 'Seguridad 24h' },
  { id: 'ef-area-verde', name: 'Área verde' },
]

export const roles = [
  { id: 'r-owner', name: 'Owner' },
  { id: 'r-admin', name: 'Admin' },
]
