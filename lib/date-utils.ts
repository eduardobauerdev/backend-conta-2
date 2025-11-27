export function formatDate(date: Date, formatStr: string): string {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const monthShort = months[date.getMonth()]

  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
  const weekDay = weekDays[date.getDay()]

  if (formatStr === "yyyy-MM-dd") {
    return `${year}-${month}-${day}`
  }
  if (formatStr === "dd MMM") {
    return `${day} ${monthShort}`
  }
  if (formatStr === "dd MMM yyyy") {
    return `${day} ${monthShort} ${year}`
  }
  if (formatStr === "dd/MM/yyyy") {
    return `${day}/${month}/${year}`
  }
  if (formatStr === "dd/MM/yyyy (EEEE)") {
    return `${day}/${month}/${year} (${weekDay})`
  }
  if (formatStr === "dd/MM/yyyy HH:mm") {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }
  return date.toISOString()
}

export function startOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function subDays(date: Date, days: number): Date {
  return addDays(date, -days)
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7)
}

export function subWeeks(date: Date, weeks: number): Date {
  return addDays(date, -weeks * 7)
}

export function parseISO(dateStr: string): Date {
  return new Date(dateStr)
}
