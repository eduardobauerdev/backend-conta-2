export interface DriveLinks {
  contratoFisica: string
  contratoJuridica: string
  ordemServico: string
}

const STORAGE_KEY = 'drive_folder_links'

export const getDriveLinks = (): DriveLinks => {
  if (typeof window === 'undefined') {
    return {
      contratoFisica: '',
      contratoJuridica: '',
      ordemServico: ''
    }
  }
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      return {
        contratoFisica: '',
        contratoJuridica: '',
        ordemServico: ''
      }
    }
  }
  
  return {
    contratoFisica: '',
    contratoJuridica: '',
    ordemServico: ''
  }
}

export const saveDriveLinks = (links: DriveLinks): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
}
