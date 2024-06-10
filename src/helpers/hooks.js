export const makeid = (length) => {
	let result = ''
	let characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let charactersLength = characters.length
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

export function currency(money, symbol = 'IDR') {
  if (money) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: symbol,
			minimumFractionDigits: 0
		}).format(money);
	} else {
		return 'Rp. 0'
	}
}