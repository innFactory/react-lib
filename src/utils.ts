
/**
 * Converts a number to a string. Default Case are 2 decimal digits e.g. 10.000.000 or 1000.4 to 1.000,40
 */
export function numberToString(n: number | undefined, decimalDigits?: number, undefinedValuePlaceholder?: string) {

  if (typeof n === 'number') {

    decimalDigits = decimalDigits === 0 || decimalDigits ? decimalDigits : 2;
    let parts = n.toFixed(decimalDigits).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (parts[1] && parts[1].length === 1) {
      if (decimalDigits > 1) {
        parts[1] += '0';
      }
    }

    // trim decimalDigits if number is longer
    if (decimalDigits > 0 && parts[1] && parts[1].length > decimalDigits) {
      parts[1] = parts[1].substring(0, decimalDigits);
    }
    return parts.join(',');
  } else {
    return (undefinedValuePlaceholder || undefinedValuePlaceholder === '') ? undefinedValuePlaceholder : '-';
  }

}

/**Object
 * use the window.location.search to parse the url query params.
 */
export function parseQueryString(s: string): any {
  var params = {}, queries, temp, i, l;

  s = s.replace('?', '');
  // Split into key/value pairs
  queries = s.split('&');
  // Convert the array of strings into an object
  for (i = 0, l = queries.length; i < l; i++) {
    temp = queries[i].split('=');
    params[temp[0]] = temp[1];
  }
  return params;
}
