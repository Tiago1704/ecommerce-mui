export const textPrecio = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
}

export const textEstado = (cond: string) => {
    if(cond === "new") return "Nuevo";
    return "Usado"
  }