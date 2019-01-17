
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


/**
 * detect IE
 * returns true if IE or false, if browser is not Internet Explorer
 */
export function isIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older
    return true;
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 
    //  var rv = ua.indexOf('rv:');
    return true;
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return false; // parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}