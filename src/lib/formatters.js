export function formatNaira(amount) {
    if (!amount) return '0';
    return Number(amount).toLocaleString('en-NG');
}