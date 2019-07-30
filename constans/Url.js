export default Url = {
    fullCap: (value) => ('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=' + value),
    fullCryptoData: (name, value) => ('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + name + '&tsyms=' + value)
}