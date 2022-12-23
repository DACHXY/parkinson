// export const IP = '192.168.137.179';
export const IP = '140.123.105.112';
export const PORT = '52696';

const Host = `http://${IP}:${PORT}/`;

export function URLgenerate(url) {
  return `${Host}${url}`;
}

export default Host;

export const ListActivityAPI = 'activity/list';
