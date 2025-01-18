export const getFormattedDate = () => {
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long'
  }
  return today.toLocaleDateString('hu-HU', options)
} 