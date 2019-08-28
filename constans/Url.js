export default Url = {
    fullCapUSD: 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD',
    fullCapEUR: 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=EUR',
    fullCapGBP: 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=GBP',
    fullCryptoData: (name, value) => ('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + name + '&tsyms=' + value)
}