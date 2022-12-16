export const IP = '192.168.137.179';
export const PORT = '8000';

const Host = `http://${IP}:${PORT}/`;

export function URLgenerate(url) {
  return `${Host}${url}`;
}

export default Host;
