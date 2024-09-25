const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('de-DE',{
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return formatter.format(num);
}
export default displayINRCurrency