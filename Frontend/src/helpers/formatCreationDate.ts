
export function formatCreationDate(dateString: string): string {
    const [month, day, year] = dateString.split('/');
    return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
}